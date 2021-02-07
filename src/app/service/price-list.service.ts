import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {


  constructor(private http : HttpClient) { }

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
      await this.http.post(url,pricelist).toPromise().then(data=>{
        alert(data);
      })
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

}


  
