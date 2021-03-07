import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommodityServiceService {

  constructor(private http : HttpClient) { }

  getUnits(){
    let url = 'http://localhost:8080/comodities/getUnits';
    return this.http.get(url)
  }

  addCommodity(commodity:any){
    let url = 'http://localhost:8080/comodities/new';
    return this.http.post(url,commodity)
  }
}
