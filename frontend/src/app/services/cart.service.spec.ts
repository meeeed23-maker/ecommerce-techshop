import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    const product = { id: 1, name: 'Test', price: 99.99, stock: 10 };
    service.addToCart(product, 2);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(2);
    });
  });

  it('should calculate total', () => {
    const product1 = { id: 1, name: 'Product 1', price: 100, stock: 10 };
    const product2 = { id: 2, name: 'Product 2', price: 50, stock: 10 };
    
    service.addToCart(product1, 1);
    service.addToCart(product2, 2);
    
    service.getTotal().subscribe(total => {
      expect(total).toBe(200);
    });
  });

  it('should clear cart', () => {
    service.addToCart({ id: 1, name: 'Test', price: 99.99, stock: 10 }, 1);
    service.clearCart();
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
    });
  });
});
