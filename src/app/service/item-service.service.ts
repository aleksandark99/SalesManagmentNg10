import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {ItemDto} from "../interfaces/item-dto"


@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  static baseUrl = 'http://localhost:8080/';
  httpClient : HttpClient;

  constructor( client : HttpClient ) {  
    this.httpClient = client;
  }

  getItems() : Observable<ItemDto>{
    return this.httpClient.get<ItemDto>(ItemServiceService.baseUrl+"dummy/items")
    
  }


}
