import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  private favKey = 'fav-burgers';
  favoriteIds = new Set<string>();

  // Copia básica de burgers para evitar refactor grande
  burgers = [
    { id: 'clasica', name: 'Clásica', description: 'Carne, lechuga, tomate, cebolla y queso', basePrice: 3500, image: 'assets/promoBurger.jpg' },
    { id: 'doble', name: 'Doble Queso', description: 'Doble carne y doble queso', basePrice: 4800, image: 'assets/promoBurger.jpg' },
    { id: 'bacon', name: 'Bacon Cheese', description: 'Carne, queso cheddar y bacon', basePrice: 4200, image: 'assets/promoBurger.jpg' },
    { id: 'criolla', name: 'Criolla', description: 'Carne, huevo, jamón, lechuga y tomate', basePrice: 4400, image: 'assets/promoBurger.jpg' },
    { id: 'pollo', name: 'Pollo Crispy', description: 'Suprema crispy, lechuga y mayo', basePrice: 4000, image: 'assets/promoBurger.jpg' },
    { id: 'veg', name: 'Veggie', description: 'Medallón vegetal, vegetales y salsa de la casa', basePrice: 3800, image: 'assets/promoBurger.jpg' },
  ];

  get favorites() {
    return this.burgers.filter(b => this.favoriteIds.has(b.id));
  }

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    try {
      const raw = localStorage.getItem(this.favKey);
      if (raw) this.favoriteIds = new Set<string>(JSON.parse(raw));
    } catch {}
  }

  toggleFavorite(id: string) {
    if (this.favoriteIds.has(id)) this.favoriteIds.delete(id); else this.favoriteIds.add(id);
    try { localStorage.setItem(this.favKey, JSON.stringify(Array.from(this.favoriteIds))); } catch {}
  }

  isFav(id: string) { return this.favoriteIds.has(id); }

  add(b: any) {
    this.cart.addItem({ name: b.name, quantity: 1, price: b.basePrice });
  }
}

