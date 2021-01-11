import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {OrderRequest} from "../interfaces/order-request"

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  static baseUrl = 'http://localhost:8080/';
  httpClient : HttpClient;

  constructor( client : HttpClient ) {  
    this.httpClient = client;
  }


  makeOrder(order : OrderRequest[]) : Observable<any>{
    return this.httpClient.post<OrderRequest>(OrderServiceService.baseUrl+"dummy/order", order)
    
  }


}
