export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface AuthResponse {
  id: number;
  username: string;
  role: string;
  message: string;
}

export interface Order {
  id: number;
  orderDate: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
}
