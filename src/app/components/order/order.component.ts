import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemServiceService } from 'src/app/service/item-service.service';
import {Item} from "../../interfaces/item"
import {Unit} from "../../interfaces/unit"
import {ItemDto} from "../../interfaces/item-dto"

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [ '.disableLink {pointer-events: none, cursor: default}'
  ]
})
export class OrderComponent implements OnInit {

  partnerForm: FormGroup;
  amountForm: FormGroup;
  public itemSelected : boolean = false;

  orderItem = [] 
  items : Item[] = [];
  units : Unit[] = [];

  
  currentItem : Item;
  currentUnit : Unit;
  currentAmount : Number;
  itemSerivce : ItemServiceService;

  constructor(public service : ItemServiceService) {
    this.itemSerivce = service;
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


  }

  get name() { return this.partnerForm.get('name'); }
  get address() { return this.partnerForm.get('address'); }
  get phone() { return this.partnerForm.get('phone'); }
  get email() { return this.partnerForm.get('email'); }
  get taxNo() { return this.partnerForm.get('taxNo'); }
  get amount() { return this.amountForm.get('amount'); }


  clicksub(){

    var x = this.partnerForm.value
    console.log(x)
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
    

}//class
