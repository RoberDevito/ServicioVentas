import { Injectable } from '@angular/core';

export interface CartItem {
  name: string;
  quantity: number;
  price: number; // unit price after options
  options?: { removed: string[]; added: string[] };
}

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems: CartItem[] = [];

  addItem(item: CartItem) {
    this.cartItems.push(item);
  }

  clear() {
    this.cartItems = [];
  }

  get total(): number {
    return this.cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
  }
}
