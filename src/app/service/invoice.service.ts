import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { InvoiceDto } from '../interfaces_responses/invoice-dto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  static baseUrl = 'http://localhost:8080/';
  httpClient : HttpClient;

  constructor( client : HttpClient ) {  
    this.httpClient = client;
  }

  //servis za fetch-ovanje liste Invoice DTO-va u zavisnosti od datuma
  getInvoiceDto(from : string, to : string) : Observable<InvoiceDto[]>{

    return  this.httpClient.get<InvoiceDto[]>(InvoiceService.baseUrl+"invoice/invoiceBook/" + from + "/" + to);
    
  }

  getBookUrl(from : string, to : string): Observable<any> {

    return  this.httpClient.get(InvoiceService.baseUrl+"invoice/generateInvoiceBookReport/" + from + "/" + to);
    
  }


}
