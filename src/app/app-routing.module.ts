import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreatePricelistComponent } from './components/create-pricelist/create-pricelist.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'createPriceList', component: CreatePricelistComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
