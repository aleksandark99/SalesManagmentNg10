import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule,HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaxServiceService {

  constructor(private http : HttpClient) { }

  getGroups(){
    let url = 'http://localhost:8080/comodities/getGroups';

    return this.http.get(url)
  }

  addGroup(name:String){
    let url = 'http://localhost:8080/comodities/addGroup/';

    return this.http.post(url+name,null)

  }

  
  addTax(validFrom:String,groupId:Number, percentage:Number)
  {
    let url = 'http://localhost:8080/comodities/addTax';
    var params = new HttpParams();
    params = params.append('validFrom', validFrom.toString());
    params = params.append('groupId', groupId.toString());
    params = params.append('percentage', percentage.toString());

    return this.http.post(url,null,{'params': params})

  }
}
