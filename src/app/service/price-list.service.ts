import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { PricelistResponse } from '../interfaces_responses/pricelist-response';
import { PricelistDetailResponse } from '../interfaces_responses/pricelist-detail-response';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PriceListService {


  constructor(private http : HttpClient,private _router: Router) { }
  

    getArticles1(){
      let url = 'http://localhost:8080/comodities/getAll';

      return this.http.get(url)
    }

    async  getArticles0(){
      let url = 'http://localhost:8080/comodities/getAll';

      console.warn("This is what you get")
      // console.log( this.http.get(url).toPromise().then())
      await this.http.get(url).toPromise().then(data=>{
        console.warn("aaaaaaaa"+data)
      })
      console.warn("This is what you get")

    }

    async createPriceList(pricelist :any){
      let url = 'http://localhost:8080/priceList/create';
      console.warn("gledaj")
      console.warn(pricelist)
      await this.http.post(url,pricelist).toPromise().then(data=>{
        alert(data);
        this._router.navigate(['/display/pricelist'])

      })
    }

     makeCopy(priceListToCopy:any){
      let url = 'http://localhost:8080/priceList/copy';
      return this.http.post(url,priceListToCopy);
      // await this.http.post(url,priceListToCopy).toPromise().then(data=>{
      //   returnData=data;
      //   // console.warn(data);
      // })
      // return returnData;
    }
    
  

  //ova metoda ce dobavljati artikle sa backenda posle za sad staticki podaci za testiranje
  getArticles(){
    return [
      {id:2, name:"cokolada", type:"comodity",price:null},
      {id:3, name:"mleko", type:"comodity",price:null},
      {id:4, name:"pivo", type:"comodity",price:null},
      {id:5, name:"cigare", type:"comodity",price:null}

    ];
  }

  //servis za fetch-ovanje Pricelist-a sa datumom vazanje i njegovim PK
  getPricelists() : Observable<PricelistResponse>{

    let url = 'http://localhost:8080/';

    return  this.http.get<PricelistResponse>(url+"priceList/");
  
  }

  //Service return price-list items and their associated date for price-list overview
  getPricelistDetails(pricelistId : Number) : Observable<PricelistDetailResponse>{

    let url = 'http://localhost:8080/';
    console.log
    return this.http.get<PricelistDetailResponse>(url+"priceList/details/" + pricelistId.toString())

  }







}


  
