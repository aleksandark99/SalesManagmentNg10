import { Component, OnInit } from '@angular/core';
import {PriceListService}   from '../../service/price-list.service';

@Component({
  selector: 'app-create-pricelist',
  templateUrl: './create-pricelist.component.html',
  styles: [
  ]
})
export class CreatePricelistComponent implements OnInit {

  constructor(private plistService:PriceListService) { }

  ngOnInit(): void {
    this.articles=this.plistService.getArticles();
    this.articles.unshift({id:0, name:"Open this select menu"})
    this.selectedArticle=0;// da "Open this select menu" bude selektovano po defaultu
  }
  articles: any =[]

  elements: any = [
    // {id: 1, name: 'mleko', price: '120'},
    // {id: 2, name: 'cokolada', price: '200'},
    // {id: 3, name: 'pivo', price: '300'},
  ];

  headElements = ['Id','Article name', 'article price'];

  selectedArticle:any;

  // selectChange() {} za akcije da se dese ako nam je potrebno na select dropdown itema al za sad nije

  hel(){
    let article=this.articles[this.selectedArticle];
    // alert(this.selectedArticle)
    // console.log(this.articles[this.selectedArticle].naziv)
    (article.id!=0) ? this.elements.push({id: article.id, name: article.name, price: '300'}) : console.log("cant append default placeholder as item")
  };

}
