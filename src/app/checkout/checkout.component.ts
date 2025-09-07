import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(public cart: CartService) {}

  data = {
    nombre: '',
    telefono: '',
    correo: '',
    direccion: {
      calle: '',
      piso: '',
      entreCalles: '',
      colonia: '',
      ciudad: '',
      cp: ''
    },
    notas: '',
    formaPago: 'Efectivo',
    montoEfectivo: undefined as number | undefined
  };

  pagar() {
    // Placeholder de pago
    console.log('Datos del cliente:', this.data);
    alert('Pago simulado por $' + this.cart.total);
    this.cart.clear();
  }
}

