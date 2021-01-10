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

  validatingForm: FormGroup;

  ngOnInit() {
    this.validatingForm = new FormGroup({
      required: new FormControl(null, Validators.required),
      required1: new FormControl(null,[Validators.required, Validators.minLength(1),Validators.maxLength(2),Validators.max(12),Validators.min(1)])
    });
  }

  get input() { return this.validatingForm.get('required'); }
  get input1() { return this.validatingForm.get('required1'); }

}