import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { CreatePricelistComponent } from './components/create-pricelist/create-pricelist.component';
import { DisplayPricelistComponentComponent } from './components/display-pricelist-component/display-pricelist-component.component';
import { PricelistBookComponent } from './components/pricelist-book/pricelist-book.component';
import { TaxComponent } from './components/tax/tax.component';
import { CommodityComponent } from './components/commodity/commodity.component';
const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'createPriceList', component: CreatePricelistComponent},
  {path: 'home', component: HomeComponent},
  {path: 'display/pricelist', component: DisplayPricelistComponentComponent},
  {path: 'ledger',component: PricelistBookComponent },
  {path: 'tax',component: TaxComponent },
  {path: 'commodities',component: CommodityComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
