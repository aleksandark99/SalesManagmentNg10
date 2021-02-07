import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { OrderRequest } from '../interfaces_requests/order-request';
import { StringResponse } from '../interfaces_responses/string-response';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  static baseUrl = 'http://localhost:8080/';
  httpClient : HttpClient;

  constructor( client : HttpClient ) {  
    this.httpClient = client;
  }

  //za kreiranje Porudzbenice
  makeOrder(order : any) : Observable<StringResponse>{
    return this.httpClient.post<StringResponse>(OrderServiceService.baseUrl+"invoice/create", order)
  }


}
