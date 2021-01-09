import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-pricelist',
  templateUrl: './create-pricelist.component.html',
  styles: [
  ]
})
export class CreatePricelistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  dropdownElements: any =[
    {id:1, naziv:"artikal jedan"},
    {id:2, naziv:"cokolada"},
    {id:3, naziv:"mleko"}

  ]

  elements: any = [
    {id: 1, first: 'mleko', last: '120'},
    {id: 2, first: 'cokolada', last: '200'},
    {id: 3, first: 'pivo', last: '300'},
  ];

  headElements = ['Id','Article name', 'article price'];
}
