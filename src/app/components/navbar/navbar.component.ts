import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  latest_date : string;


  constructor(public datepipe: DatePipe) {
    let date =this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.latest_date = date;
   }

  ngOnInit(): void {
  }

}
