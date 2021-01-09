import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  

  ngOnInit() {
    // this.validatingForm = new FormGroup({
    //   required: new FormControl(null, Validators.required),
    //   required1: new FormControl(null,Validators.required)
    // });
  }

  // get input() { return this.validatingForm.get('required'); }
  // get input1() { return this.validatingForm.get('required1'); }

}
