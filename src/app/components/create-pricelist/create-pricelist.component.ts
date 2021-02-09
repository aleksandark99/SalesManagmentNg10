import { Component, OnInit } from '@angular/core';
import {PriceListService}   from '../../service/price-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {SharedServiceService} from '../../service/shared-service.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-create-pricelist',
  templateUrl: './create-pricelist.component.html',
  styles: [
  ]
})
export class CreatePricelistComponent implements OnInit {
  editField: string;
  private state$: Observable<object>;
  private makingCopy:boolean;
  private pListToCopy:any;
  constructor(private plistService:PriceListService,private sharedService: SharedServiceService,public router: Router, public activatedRoute: ActivatedRoute) { 
    console.warn(this.router.getCurrentNavigation().extras.state)
    this.pListToCopy=this.router.getCurrentNavigation().extras.state;
    if(this.router.getCurrentNavigation().extras.state!=null){
      console.warn("make copy")
      this.makingCopy=false;
      this.pListToCopy=this.router.getCurrentNavigation().extras.state;
    }else{
      console.warn("Make new one")
      this.makingCopy=true;
    }

  }

  ngOnInit(): void {

    this.validatingPrice = new FormGroup({
      priceVal: new FormControl(null,[Validators.required,Validators.min(0.01)]),
    });
    if(this.makingCopy){
    this.plistService.getArticles1().subscribe(data=>{
      this.articles=data;

      this.articles.unshift({id:0, name:"Open this select menu"})
      this.selectedArticle=0;// da "Open this select menu" bude selektovano po defaultu

    });
    // this.articles=this.plistService.getArticles1();


  }else{
    console.log("In mode for making copy")
    console.log(this.pListToCopy)
    let d;
    this.plistService.makeCopy(this.pListToCopy).subscribe(data=>{
      d=data;
      console.warn(d.commodityDtos)
      
      this.articles=d.commodityDtos;

      this.articles.unshift({id:0, name:"Open this select menu"})
      this.selectedArticle=0;// da "Open this select menu" bude selektovano po defaultu
      this.elements=d.priceListItems;

    });
  }
  }
  articles: any =[];

  elements: any = [];

  headElements = ['Id','Article name', 'article price','type'];


  selectedArticle:any;
  selectedDate:Date;

  // selectChange() {} za akcije da se dese ako nam je potrebno na select dropdown itema al za sad nije
getSelarticle(){
  return this.articles[this.selectedArticle]
}

  addPriceItem(){
    
    this.sharedService.changeIncrease(true);
    let index=   this.articles.findIndex(x => x.id == this.selectedArticle);
    let article=this.articles[index];
    let price = this.validatingPrice.get('priceVal').value;
    console.log(article);
   if (article!=null && price>0.01 &&index!=0) {
    // this.elements.push({id: article.id, name: article.name, price: price,type: article.type}) ;
    article.price=price;
    this.elements.push(article)
    this.selectedArticle=0;
    (index === this.articles.length) ? this.articles.pop() :    this.articles.splice(index,1);
    this.validatingPrice.reset();

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

  isDateValid(){

    let seldate=new Date(this.selectedDate);
    var isValid:boolean;

      (seldate < new Date()) ? isValid=false : isValid=true;
      (!isValid) ? alert("You can choose only future date") : console.log("hi");     

      return isValid;




  }
  createPricelist(){
    // (this.elements.length>0 && this.elements!=null &&this.isDateValid() ) ? console.log("send to backend to be created") : alert("Data not valid");

    let date=      new Date(this.selectedDate).toString()
    let priceListItems = this.elements;
    let priceListToSend={
      date,
      priceListItems
    };

    (this.elements.length>0 && this.elements!=null &&this.isDateValid() ) ? this.plistService.createPriceList(priceListToSend) : alert("Data not valid");



    console.log(priceListToSend)
    console.log(new Date(this.selectedDate).toISOString())
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

  changeValue(id: number, property: string, event: any) {

    if(!isNaN(event.target.textContent)){
      console.warn(event.target.textContent)
      this.editField = event.target.textContent;

    }else{
      console.warn("error")
      event.target.textContent=0;
    }
    
  }
  updateList(id: number, property: string, event: any) {

    // if(!isNaN(event.target.textContent)){
    //   const editField = event.target.textContent;
    //    this.elements[id][property] = editField;

    // }else{
    //   console.warn("error")
    
    // }
  }
}
