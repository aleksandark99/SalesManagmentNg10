import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { PriceListItemResponse } from '../interfaces_responses/pricelist-item-response';




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
   getPricelistItems(date : string) : Observable<PriceListItemResponse>{

    return  this.httpClient.get<PriceListItemResponse>(FetchPricelistItemsService.baseUrl+"priceList/pricelistItems/" + date);
  
  }

}
