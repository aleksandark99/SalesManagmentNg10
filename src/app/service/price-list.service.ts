import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor() { }


  test(){
    alert("testservice works")
  }

  getArticles(){
    return [
      {id:1, name:"artikal jedan"},
      {id:2, name:"cokolada"},
      {id:3, name:"mleko"}
    ];
  }
}
