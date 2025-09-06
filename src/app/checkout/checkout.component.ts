import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(public cart: CartService) {}

  pagar() {
    // Placeholder de pago
    alert('Pago simulado por $' + this.cart.total);
    this.cart.clear();
  }
}

