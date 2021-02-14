import { Component, OnInit } from '@angular/core';
import { InvoiceDto } from 'src/app/interfaces_responses/invoice-dto';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-pricelist-book',
  templateUrl: './pricelist-book.component.html',
  styleUrls: ['./pricelist-book.component.scss']
})
export class PricelistBookComponent implements OnInit {

  fromDate : Date;

  toDate : Date;

  //Invoice-i koji kreirani izmedju datuma koje je korisnik izabrao na front-u
  invoiceItems : InvoiceDto[] = [];

  //servis za fetch-ovanje liste Invoice DTO-va u zavisnosti od datuma
  invoiceService : InvoiceService;

  constructor( public serviceInvoice : InvoiceService) {
    this.invoiceService = serviceInvoice;
  
  }

  ngOnInit(): void {
  }


  onClickFilter(){
    let to = new Date(this.toDate);
    let from =  new Date(this.fromDate);

    if (Number(from) <= Number(to)){
      this.invoiceService.getInvoiceDto(from.getTime().toString(), to.getTime().toString()).subscribe(data => this.invoiceItems = data);

    }
  }

}
