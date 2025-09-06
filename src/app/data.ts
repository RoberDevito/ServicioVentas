export type Extra = { key: string; price: number };
export type Burger = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  ingredients: string[];
  extras: Extra[];
  image: string;
};

export const BURGERS: Burger[] = [
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

export const PROMOS = [
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

