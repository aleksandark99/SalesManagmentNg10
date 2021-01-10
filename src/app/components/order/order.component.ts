import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Item} from "../../interfaces/item"
import {Unit} from "../../interfaces/unit"

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: [
  ]
})
export class OrderComponent implements OnInit {

  partnerForm: FormGroup;


  constructor() { }
  optionsSelect: Array<any>;
  selectedOption: any = {value: '', label: ''};
  selectControl = new FormControl('');
  



  ngOnInit(): void {

    this.partnerForm = new FormGroup({
      name: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      address: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      phone: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      email: new FormControl(null, [Validators.required, Validators.email, this.noWhitespaceValidator]),
      taxNo: new FormControl(null, [Validators.required, this.noWhitespaceValidator, Validators.pattern("[0-9]*$")])
     
    });

    
    
   
  
  }

  get name() { return this.partnerForm.get('name'); }
  get address() { return this.partnerForm.get('address'); }
  get phone() { return this.partnerForm.get('phone'); }
  get email() { return this.partnerForm.get('email'); }
  get taxNo() { return this.partnerForm.get('taxNo'); }


  clicksub(){

    var x = this.partnerForm.value
    console.log(x)
  }



  public noWhitespaceValidator(control: FormControl) {
    var isWhitespace = (control.value || '').trim().length === 0;
    var isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


  editField: string;
    personList: Array<any> = [
      { id: 1, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
      { id: 2, name: 'Guerra Cortez', age: 45, companyName: 'Insectus', country: 'USA', city: 'San Francisco' },
      { id: 3, name: 'Guadalupe House', age: 26, companyName: 'Isotronic', country: 'Germany', city: 'Frankfurt am Main' },
      { id: 4, name: 'Aurelia Vega', age: 30, companyName: 'Deepends', country: 'Spain', city: 'Madrid' },
      { id: 5, name: 'Elisa Gallagher', age: 31, companyName: 'Portica', country: 'United Kingdom', city: 'London' },
    ];

    awaitingPersonList: Array<any> = [
      { id: 6, name: 'George Vega', age: 28, companyName: 'Classical', country: 'Russia', city: 'Moscow' },
      { id: 7, name: 'Mike Low', age: 22, companyName: 'Lou', country: 'USA', city: 'Los Angeles' },
      { id: 8, name: 'John Derp', age: 36, companyName: 'Derping', country: 'USA', city: 'Chicago' },
      { id: 9, name: 'Anastasia John', age: 21, companyName: 'Ajo', country: 'Brazil', city: 'Rio' },
      { id: 10, name: 'John Maklowicz', age: 36, companyName: 'Mako', country: 'Poland', city: 'Bialystok' },
    ];

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.personList[id][property] = editField;
    }

    remove(id: any) {
      this.awaitingPersonList.push(this.personList[id]);
      this.personList.splice(id, 1);
    }

    add() {
      if (this.awaitingPersonList.length > 0) {
        const person = this.awaitingPersonList[0];
        this.personList.push(person);
        this.awaitingPersonList.splice(0, 1);
      }
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

    
    public items = [{ id: 1, name: 'Mleko', units : [{id: 1, name : "litar", abbreviation : "L"}] }, {id: 2, name: 'Gvožđe' , units : [{id: 1, name : "kilograms", abbreviation : "KG"}]}, {id: 3, name: 'Trake za krečenje', units : [{id: 1, name : "metar", abbreviation : "m"}] }];  

    public units : any;
  

    public itemSelected : boolean = false;
    public amountSelected : boolean = false;
    

    itemSelectedId = -1;
    unitSelectedId = -1;
    currentItem : Item;
    currentUnit : Unit;
    

    onClickedUnit(){
      
      this.amountSelected = true;

    }

    onClickedItem(newValue : Event) {
      console.log(this.currentItem);

      this.itemSelected = true;
      this.units = this.currentItem.units
     
      // ... do other stuff here ...
    }
    

}//class
