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
  selectedDate:Date;

  // selectChange() {} za akcije da se dese ako nam je potrebno na select dropdown itema al za sad nije
getSelarticle(){
  return this.articles[this.selectedArticle]
}

  addPriceItem(){
    let index=   this.articles.findIndex(x => x.id == this.selectedArticle);
    let article=this.articles[index];
    let price = this.validatingPrice.get('priceVal').value;
    // console.log(this.articles[this.selectedArticle].naziv)
    console.log(article);
   if (article!=null && price>0.01) {
    this.elements.push({id: article.id, name: article.name, price: price}) ;
    this.selectedArticle=0;
    (index === this.articles.length) ? this.articles.pop() :    this.articles.splice(index,1);
   }
  else{

  alert("You must choose article and type in price for it!")
  }
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
    // let isDayhValid:boolean =this.validatingForm.get('dayVal').valid;
    // let isMonthValid:boolean =this.validatingForm.get('monthVal').valid;
    // let isYearValid:boolean =this.validatingForm.get('yearVal').valid;    
    // return    (isDayhValid && isMonthValid && isYearValid ); 
    let seldate=new Date(this.selectedDate);
    var isValid:boolean;

      (seldate < new Date()) ? isValid=false : isValid=true;
      (!isValid) ? alert("You can choose only future date") : console.log("hi");     

      return isValid;




  }
  createPricelist(){
    (this.elements.length>0 && this.elements!=null &&this.isDateValid() ) ? console.log("send to backend to be created") : alert("Data not valid");

    console.log(this.elements)
  }

  removeItem(id){
    console.log(id)
    let index=   this.elements.findIndex(x => x.id == id);

    let article=this.elements[index];
    this.elements.splice(index,1);
    this.articles.push(article);
    this.articles.sort(this.compare)
    console.log(index)
  }
   compare( a, b ) {
     let val;
      (a.id < b.id ) ? val=-1 : val=1;
    return val;
  }

}
