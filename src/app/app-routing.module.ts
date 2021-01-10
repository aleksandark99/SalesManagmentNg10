import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { CreatePricelistComponent } from './components/create-pricelist/create-pricelist.component';

const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'createPriceList', component: CreatePricelistComponent},
  {path: 'home', component: HomeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
