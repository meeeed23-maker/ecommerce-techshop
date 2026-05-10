import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItems = JSON.parse(saved);
      this.cartSubject.next(this.cartItems);
      this.updateTotal();
    }
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
    this.updateTotal();
  }

  private updateTotal(): void {
    const total = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    this.totalSubject.next(total);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  getTotal(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existing = this.cartItems.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }
}
