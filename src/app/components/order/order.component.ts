import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemServiceService } from 'src/app/service/item-service.service';
import { PartnerService } from 'src/app/service/partner.service';
import { OrderServiceService } from 'src/app/service/order-service.service';
import {Item} from "../../interfaces/item"
import {Unit} from "../../interfaces/unit"
import {OrderRequest} from "../../interfaces/order-request"
import {Partner} from "../../interfaces/partner"



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [ 
  ]
})
export class OrderComponent implements OnInit {

  partnerForm: FormGroup;
  amountForm: FormGroup;
  itemSelected : boolean = false;

  orderItem = [] 
  items : Item[] = [];
  units : Unit[] = [];
  partners : Partner[] = [];

  
  currentItem : Item;
  currentUnit : Unit;
  currentPartner : Partner;
  currentAmount : Number;
  itemSerivce : ItemServiceService;
  partnerService : PartnerService;
  orderService : OrderServiceService;

  constructor(public serviceItems : ItemServiceService, public servicePartners : PartnerService, serviceOrder : OrderServiceService ) {
    this.itemSerivce = serviceItems;
    this.partnerService = servicePartners;
    this.orderService = serviceOrder;
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

    this.itemSerivce.getItems().subscribe(data => this.items.push(...data.items));

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


    remove(id: any) {
      this.orderItem.splice(id, 1);
    }

    add() {

      if (this.itemSelected && this.currentUnit != null && this.amount.value >= 0){
        
        var tempItemObj = {
            id: this.currentItem.id,
            idItem : this.currentItem.id, 
            idUnit : this.currentUnit.id,
            name : this.currentItem.name,
            description : this.currentItem.description,
            unit : this.currentUnit.name,
            abbreviation : this.currentUnit.abbreviation,
            amount : this.amount.value,
            unitPrice : this.currentItem.unitPrice
        }
        this.orderItem.push(tempItemObj)           
      }

    }


    onClickedUnit(){
      

    }

    onClickedItem(newValue : Event) {

      this.itemSelected = true;
      this.units = this.currentItem.units
      this.currentUnit = null;

    }

    onClickedPartner(){ 
  
    }

    makeOrder(){

      if (this.currentPartner == null){
        alert("Please select Company before placing your Order!")
      } else {
        var orderRequest : OrderRequest[] = [];
     
        this.orderItem.forEach(item => orderRequest.push({"itemId" : item.idItem, 
                                                          "unitId" : item.idUnit,
                                                          "amount" : item.amount, 
                                                          "companyId" : this.currentPartner.id }));

        this.orderItem = []
        this.currentItem = null;
        this.currentUnit = null;
        this.itemSelected = false;


        console.log("sending order...")
        //  this.partnerService.getPartners().subscribe(data => this.partners = data);
        this.orderService.makeOrder(orderRequest).subscribe(data => console.log(data));



      }

      


      
    }
    

}//class
