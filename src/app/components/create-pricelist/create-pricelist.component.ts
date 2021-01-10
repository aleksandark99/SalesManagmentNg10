import { Component, OnInit } from '@angular/core';
import {PriceListService}   from '../../service/price-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
    // za validaciju
     this.validatingForm = new FormGroup({
      monthVal: new FormControl(null,[Validators.required,Validators.min(1),Validators.max(12)]),
      dayVal: new FormControl(null,[Validators.required,Validators.min(1),Validators.max(31)]),// napraviti da je max 28/29/30/31 u zavisnosi od godine
      yearVal: new FormControl(null,[Validators.required,Validators.min(2021),Validators.max(2021+5)])// umesto 2021 staviti current year
    });
    this.validatingPrice = new FormGroup({
      priceVal: new FormControl(null,[Validators.required,Validators.min(0.01)]),
    });

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

  addPriceItem(){
    let article=this.articles[this.selectedArticle];
    let price = this.validatingPrice.get('priceVal').value;
    // alert(this.selectedArticle)
    // console.log(this.articles[this.selectedArticle].naziv)
  

    (article.id!=0 && price>0.01) ? this.elements.push({id: article.id, name: article.name, price: price}) : alert("You must choose article and type in price for it!")

  };
  //
  // validacija cene
  validatingPrice: FormGroup;
  get priceInput() { return this.validatingPrice.get('priceVal'); }  // mozemo da proverimo if input1 is valid za validaciju pre slanja na back

  // validacija datuma 
  validatingForm: FormGroup;
  get dInput() { return this.validatingForm.get('dayVal'); }  // mozemo da proverimo if input1 is valid za validaciju pre slanja na back
  get mInput() { return this.validatingForm.get('monthVal'); }  // mozemo da proverimo if input1 is valid za validaciju pre slanja na back
  get yInput() { return this.validatingForm.get('yearVal'); }  // mozemo da proverimo if input1 is valid za validaciju pre slanja na back
  
  isDateValid(){
    let isDayhValid:boolean =this.validatingForm.get('dayVal').valid;
    let isMonthValid:boolean =this.validatingForm.get('monthVal').valid;
    let isYearValid:boolean =this.validatingForm.get('yearVal').valid;
    // (isDayhValid && isMonthValid && isYearValid ) ? console.log("validno") : console.log("nije validno")
    
    return    (isDayhValid && isMonthValid && isYearValid ); 
    // console.log(this.validatingForm.get('yearVal').valid)
    
  }
  createPricelist(){
    console.log(this.isDateValid());// provera za date
    console.log(this.elements.length);// ako
    (this.elements.length>0 && this.elements!=null &&this.isDateValid() ) ? console.log("posalji na bekend da se kreira ") : alert("neispravni podaci");

    console.log(this.elements)
  }
}
