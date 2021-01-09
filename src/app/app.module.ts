import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CreatePricelistComponent } from './components/create-pricelist/create-pricelist.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatePricelistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
