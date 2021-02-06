import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { Item } from '../interfaces_responses/item';
import { Pricelist } from '../interfaces_responses/pricelist';



@Injectable({
  providedIn: 'root'
})
export class FetchPricelistItemsService {

  static baseUrl = 'http://localhost:8080/';
  httpClient : HttpClient;

  constructor( client : HttpClient ) {  
    this.httpClient = client;
  }

  //servis za fetch-ovanje CommodityDto-ova sa njihovim Unit-ma i Porezima 
   getPricelistItems(date : string) : Observable<Pricelist>{

    return  this.httpClient.get<Pricelist>(FetchPricelistItemsService.baseUrl+"invoice/pricelistItems/" + date);
  
  }

}
