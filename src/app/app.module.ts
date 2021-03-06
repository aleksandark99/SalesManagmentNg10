import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CreatePricelistComponent } from './components/create-pricelist/create-pricelist.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderComponent } from './components/order/order.component';
import { DatePipe } from '@angular/common';
import { HttpBackend, HttpClient, HttpClientModule } from '@angular/common/http';
import { DisplayPricelistComponentComponent } from './components/display-pricelist-component/display-pricelist-component.component';
import { PricelistBookComponent } from './components/pricelist-book/pricelist-book.component';
import { CommodityComponent } from './components/commodity/commodity.component';

// import { BehaviorSubject } from 'rxjs';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePricelistComponent,
    NavbarComponent,
    OrderComponent,
    DisplayPricelistComponentComponent,
    PricelistBookComponent,
    CommodityComponent,
    // BehaviorSubject

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
