import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'servicios';

  constructor(public cart: CartService, private router: Router) {}

  // Promos destacadas (precio fijo, sin personalización)
  promos = [
    {
      id: 'promo-clasica',
      name: 'Promo Clásica + Bebida',
      description: 'Hamburguesa clásica + gaseosa 500ml',
      price: 3900,
      oldPrice: 4500,
      image: 'assets/promoBurger.jpg',
    },
    {
      id: 'promo-doble',
      name: 'Doble + Papas',
      description: 'Doble queso con papas medianas',
      price: 5200,
      oldPrice: 5900,
      image: 'assets/promoBurger.jpg',
    },
    {
      id: 'promo-bacon',
      name: 'Bacon Lover',
      description: 'Clásica con bacon + papas',
      price: 4700,
      oldPrice: 5300,
      image: 'assets/promoBurger.jpg',
    },
  ];

  burgers = [
    {
      id: 'clasica',
      name: 'Clásica',
      description: 'Carne, lechuga, tomate, cebolla y queso',
      basePrice: 3500,
      ingredients: ['Carne', 'Lechuga', 'Tomate', 'Cebolla', 'Queso'],
      extras: [
        { key: 'Queso extra', price: 300 },
        { key: 'Bacon', price: 500 },
        { key: 'Huevo', price: 400 },
      ],
      image: 'assets/promoBurger.jpg',
    },
    {
      id: 'doble',
      name: 'Doble Queso',
      description: 'Doble carne y doble queso',
      basePrice: 4800,
      ingredients: ['Carne', 'Carne', 'Queso', 'Queso', 'Pan'],
      extras: [
        { key: 'Cebolla caramelizada', price: 400 },
        { key: 'Pepinillos', price: 200 },
      ],
      image: 'assets/promoBurger.jpg',
    },
    {
      id: 'bacon',
      name: 'Bacon Cheese',
      description: 'Carne, queso cheddar y bacon',
      basePrice: 4200,
      ingredients: ['Carne', 'Queso', 'Bacon', 'Pan'],
      extras: [
        { key: 'Queso extra', price: 300 },
        { key: 'Huevo', price: 400 },
      ],
      image: 'assets/promoBurger.jpg',
    },
    {
      id: 'criolla',
      name: 'Criolla',
      description: 'Carne, huevo, jamón, lechuga y tomate',
      basePrice: 4400,
      ingredients: ['Carne', 'Huevo', 'Jamón', 'Lechuga', 'Tomate'],
      extras: [
        { key: 'Queso', price: 300 },
        { key: 'Bacon', price: 500 },
      ],
      image: 'assets/promoBurger.jpg',
    },
    {
      id: 'pollo',
      name: 'Pollo Crispy',
      description: 'Suprema crispy, lechuga y mayo',
      basePrice: 4000,
      ingredients: ['Pollo', 'Lechuga', 'Mayonesa', 'Pan'],
      extras: [
        { key: 'Queso', price: 300 },
        { key: 'Bacon', price: 500 },
      ],
      image: 'assets/promoBurger.jpg',
    },
    {
      id: 'veg',
      name: 'Veggie',
      description: 'Medallón vegetal, vegetales y salsa de la casa',
      basePrice: 3800,
      ingredients: ['Veggie', 'Lechuga', 'Tomate', 'Cebolla', 'Salsa'],
      extras: [
        { key: 'Queso', price: 300 },
        { key: 'Huevo', price: 400 },
      ],
      image: 'assets/promoBurger.jpg',
    },
  ];

  // Modal state
  showModal = false;
  showCart = false;
  selected: {
    name: string;
    basePrice: number;
    ingredients: string[];
    extras: { key: string; price: number }[];
    image?: string;
  } | null = null;
  removed = new Set<string>();
  added = new Set<string>();
  quantity = 1;

  // Favoritos
  private favKey = 'fav-burgers';
  favorites = new Set<string>();

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem(this.favKey);
      if (raw) this.favorites = new Set<string>(JSON.parse(raw));
    } catch {}
  }

  private saveFavs() {
    try { localStorage.setItem(this.favKey, JSON.stringify(Array.from(this.favorites))); } catch {}
  }

  toggleFavorite(id: string) {
    if (this.favorites.has(id)) this.favorites.delete(id); else this.favorites.add(id);
    this.saveFavs();
  }

  isFav(id: string) { return this.favorites.has(id); }

  openModal(burger: any) {
    this.selected = burger;
    this.removed = new Set<string>();
    this.added = new Set<string>();
    this.quantity = 1;
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  toggleRemove(ing: string) {
    if (this.removed.has(ing)) this.removed.delete(ing); else this.removed.add(ing);
  }

  toggleAdd(extraKey: string) {
    if (this.added.has(extraKey)) this.added.delete(extraKey); else this.added.add(extraKey);
  }

  currentPrice(): number {
    if (!this.selected) return 0;
    const addedTotal = this.selected.extras
      .filter(e => this.added.has(e.key))
      .reduce((s, e) => s + e.price, 0);
    return this.selected.basePrice + addedTotal;
  }

  incQty() { this.quantity = this.quantity + 1; }
  decQty() { this.quantity = Math.max(1, this.quantity - 1); }

  addToCart() {
    if (!this.selected) return;
    const unitPrice = this.currentPrice();
    this.cart.addItem({
      name: this.selected.name,
      quantity: this.quantity,
      price: unitPrice,
      options: { removed: Array.from(this.removed), added: Array.from(this.added) }
    });
    this.closeModal();
  }

  get total() { return this.cart.total; }
  get itemCount() { return this.cart.cartItems.reduce((s, it) => s + it.quantity, 0); }

  pedir() { this.openCart(); }
  openCart() { this.showCart = true; }
  closeCart() { this.showCart = false; }
  goCheckout() { this.closeCart(); this.router.navigate(['/checkout']); }

  get isCheckout() { return this.router.url.startsWith('/checkout'); }
  get isFavorites() { return this.router.url.startsWith('/favoritos'); }

  goHome() { this.router.navigateByUrl('/'); }
  goFavorites() { this.router.navigateByUrl('/favoritos'); }

  addPromo(p: { name: string; price: number }) {
    this.cart.addItem({ name: p.name, quantity: 1, price: p.price });
  }

  // Cantidades rápidas por burger
  private quickQty: Record<string, number> = {};
  getQuickQty(id: string) { return this.quickQty[id] ?? 1; }
  private setQuickQty(id: string, value: number) {
    this.quickQty[id] = Math.max(1, value | 0);
  }
  incQuickQty(id: string) { this.setQuickQty(id, this.getQuickQty(id) + 1); }
  decQuickQty(id: string) { this.setQuickQty(id, this.getQuickQty(id) - 1); }

  quickOrder(b: any) {
    const qty = this.getQuickQty(b.id);
    this.cart.addItem({
      name: b.name,
      quantity: qty,
      price: b.basePrice,
      options: { removed: [], added: [] }
    });
    // No abrir el carrito aquí; solo con el ícono FAB
  }

  // Simple cart modifiers (without touching service)
  incCart(i: number) {
    const it = this.cart.cartItems[i];
    if (it) it.quantity += 1;
  }
  decCart(i: number) {
    const it = this.cart.cartItems[i];
    if (!it) return;
    it.quantity -= 1;
    if (it.quantity <= 0) this.cart.cartItems.splice(i, 1);
  }
  removeCart(i: number) {
    if (this.cart.cartItems[i]) this.cart.cartItems.splice(i, 1);
  }

}
