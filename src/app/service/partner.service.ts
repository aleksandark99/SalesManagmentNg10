import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {Partner} from "../interfaces_responses/partner"

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  static baseUrl = 'http://localhost:8080/';
  httpClient : HttpClient;

  constructor( client : HttpClient ) {  
    this.httpClient = client;
  }

  getPartners() : Observable<Partner[]>{
    return this.httpClient.get<Partner[]>(PartnerService.baseUrl+"bussinesPartner/")
    
  }

  addPartner(partner : Partner) : Observable<Partner>{
    return this.httpClient.post<Partner>(PartnerService.baseUrl+"bussinesPartner/add", partner)
    
  }
}
