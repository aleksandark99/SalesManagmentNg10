import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartnerService } from 'src/app/service/partner.service';
import {Partner} from "../../interfaces_responses/partner"
import {PriceListItemsDto} from "../../interfaces_responses/pricelistitemsdto"
import { Item } from 'src/app/interfaces_responses/item';
import { FetchPricelistItemsService } from 'src/app/service/fetch-pricelist-items.service';
import { Commodity } from 'src/app/interfaces_responses/commodity';
import { build$ } from 'protractor/built/element';
import { Pricelist } from 'src/app/interfaces_responses/pricelist';
import { runInThisContext } from 'vm';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [ 
  ]
})
export class OrderComponent implements OnInit {

  partnerForm: FormGroup;
  amountForm: FormGroup;
  
  //redovi iz tabele, podaci koji idu u Porudzbenicu
  orderItem = [] 

  //postojeci poslovni partneri iz baze
  partners : Partner[] = [];
  
  //lista Item-a, koji u suštini predstavljaju listu RobaIliUsluga
  items : Item[] = [];

  //lista jedinica za jednu RobuIliUslugu
  units : PriceListItemsDto[] = [];
  
  //izabrani BussinesPartner za koga se kreira porudzbenica
  currentPartner : Partner;

  //kolicina za stavku prilikom kreiranja novog reda (stavke) u tabeli
  currentAmount : Number;

  //predstavlja trenutno selektovanu RobuIliUslugu (Commodity) [ovaj objekat uključuje i listu jednica (Unita-) u kojima se moze kupiti]
  currentItem : Item;
  
  //trenutno selektovana jednica (Unit) za izabranu RobuIliUslugu (Commodity)
  currentUnit : PriceListItemsDto;

  //datum na kalendaru, od ovog datuma zavisi koje sve Commodity-je tj. RobeIliUsluge (zajedno sa njihovim jedinicama u kojima se sve prodaju) koje server vraca
  selectedDate : Date;

  //servis koji vraca/dodaje BussinesPartnere
  partnerService : PartnerService;

  //servis za GET-ovanje cenovnika (sa pripadajucim Commodity-ima i njihovim jednicama)
  pricelistItemsService : FetchPricelistItemsService;

  constructor( public servicePartners : PartnerService, public servicePricelistItems : FetchPricelistItemsService) {
    this.partnerService = servicePartners;
    this.pricelistItemsService = servicePricelistItems;
   }

  ngOnInit(): void {

    this.partnerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      address: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      phone: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      email: new FormControl(null, [Validators.required, Validators.email, this.noWhitespaceValidator]),
      taxNo: new FormControl(null, [Validators.required, this.noWhitespaceValidator, Validators.pattern("[0-9]*$")])
    });

    this.amountForm = new FormGroup({
      amount: new  FormControl(null,  Validators.compose([Validators.required ]))
    });


    this.partnerService.getPartners().subscribe(data => this.partners = data);
   
  }

  get name() { return this.partnerForm.get('name'); }
  get address() { return this.partnerForm.get('address'); }
  get phone() { return this.partnerForm.get('phone'); }
  get email() { return this.partnerForm.get('email'); }
  get taxNo() { return this.partnerForm.get('taxNo'); }
  get amount() { return this.amountForm.get('amount'); }


  clicksub(){

   
  }

  savePartnerAndCloseModal(modal : any){
    modal.hide()
    var partner = <Partner>{}
    partner.name = this.name.value;
    partner.phone = this.phone.value;
    partner.taxNumber = this.taxNo.value;
    partner.email =  this.phone.value;
    partner.address = this.address.value;
    
    this.partnerService.addPartner(partner).subscribe(data =>{
      this.currentPartner = data
      this.partners.push(data)
    });

  }



  public noWhitespaceValidator(control: FormControl) {
    var isWhitespace = (control.value || '').trim().length === 0;
    var isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  onClickCalendar(){


    let x = new Date(this.selectedDate);

 
    console.log(x.getTime())

    //praznimo sve liste ako se promeni datum 
    this.currentItem = null;
    this.items = [];
    this.units = [];
    this.orderItem = [];

    //ucitavanje novi podataka sa servera
    this.servicePricelistItems.getPricelistItems(x.getTime().toString()).subscribe(data => { 
      this.items = data.items;
    } );



  }


  remove(id: any) {
      this.orderItem.splice(id, 1);
  }

  add() {

    if (this.selectedDate != null && this.currentItem != null && this.currentUnit){

      var tempItemForOrder = {}

    } 

  }


  onClickedUnit(){
      console.log("clicked unit")

  }

  //setuje listu jedinica za odredjeni commodity
  onClickedCommodity() {
      this.units = this.currentItem.priceListItemsDto;
  }

  onClickedPartner(){ 
  
  }

  makeOrder(){

    

      


      
  }
    

}//class
