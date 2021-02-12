import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { StringResponse } from '../interfaces_responses/string-response';
import { OrderDto } from '../interfaces_requests/order-dto';

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
  makeOrder(order : OrderDto) : Observable<StringResponse>{
    return this.httpClient.post<StringResponse>(OrderServiceService.baseUrl+"invoice/create", order)
  }


}
