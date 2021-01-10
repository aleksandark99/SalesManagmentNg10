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
      {id:1, name:"artikal jedan"},
      {id:2, name:"cokolada"},
      {id:3, name:"mleko"},
      {id:4, name:"pivo"},
      {id:5, name:"cigare"}

    ];
  }
}
