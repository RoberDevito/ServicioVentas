import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'favoritos', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
