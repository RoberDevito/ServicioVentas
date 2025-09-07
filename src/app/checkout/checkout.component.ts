  import { Component, OnInit } from '@angular/core';
  import { CartService } from '../cart.service';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';

  @Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
  })
  export class CheckoutComponent implements OnInit {
    submitted = false;

    constructor(
      public cart: CartService,
      private fb: FormBuilder
    ) {}

    data = this.fb.group ({
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        piso: [''],
        entreCalles: [''],
        colonia: [''],
        ciudad: [''],
        cp: ['']
      }),
      notas: [''],
      formaPago: ['', Validators.required],
      montoEfectivo: ['', Validators.required]
    });

    ngOnInit(): void {
      const formaPagoCtrl = this.data.get('formaPago');
      const montoCtrl = this.data.get('montoEfectivo');
      formaPagoCtrl?.valueChanges.subscribe(v => {
        if (!montoCtrl) return;
        if (v === 'Efectivo') {
          montoCtrl.setValidators([Validators.required]);
        } else {
          montoCtrl.setValidators(null);
          montoCtrl.setValue('');
        }
        montoCtrl.updateValueAndValidity({ emitEvent: false });
      });
    }

    pagar() {
      this.submitted = true;
      if(this.data.valid){
        console.log('form con exito')
      }else{
        const msj = "Complete los campos faltantes" 
        this.data.markAllAsTouched();
        try {
          const firstInvalid: HTMLElement | null = document.querySelector('[formcontrolname].ng-invalid, .input-underline.ng-invalid');
          if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstInvalid.focus?.();
          }
        } catch {}
        return;
      }
      console.log('Datos del cliente:', this.data);
      alert('Pago simulado por $' + this.cart.total);
    }
  }
