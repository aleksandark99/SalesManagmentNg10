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
  options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  selectControl = new FormControl('');
  

  ngOnInit() {
    // this.validatingForm = new FormGroup({
    //   required: new FormControl(null, Validators.required),
    //   required1: new FormControl(null,Validators.required)
    // });
    this.selectControl.valueChanges.subscribe((value: any) => {
      console.log('Selected value:', value);
    })
  }

  // get input() { return this.validatingForm.get('required'); }
  // get input1() { return this.validatingForm.get('required1'); }

}
