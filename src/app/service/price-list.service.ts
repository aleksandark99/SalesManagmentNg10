import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor() { }


  test(){
    alert("testservice works")
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
