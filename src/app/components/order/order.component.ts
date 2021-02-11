import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartnerService } from 'src/app/service/partner.service';
import {Partner} from "../../interfaces_responses/partner"
import { FetchPricelistItemsService } from 'src/app/service/fetch-pricelist-items.service';
import { OrderServiceService } from 'src/app/service/order-service.service';
import { OrderItem } from 'src/app/interfaces_requests/order-item';
import { CommodityDto } from 'src/app/interfaces_responses/commodity-dto';




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
  orderItems = [] 

  //postojeci poslovni partneri iz baze
  partners : Partner[] = [];
  
  //ukupna cena svih stavki sa pripadajucim porezima
  orderTotal : Number;

  //trenutno izabrani Commodity
  currentCommodity : CommodityDto;

  //lista CommodityDto objekata (koji predstavalju cenovnik) za izabrani datum
  commodities : CommodityDto[] = [];
  
  //izabrani BussinesPartner za koga se kreira porudzbenica
  currentPartner : Partner;

  //kolicina za stavku prilikom kreiranja novog reda (stavke) u tabeli
  currentAmount = 0;
  
  //datum na kalendaru, od ovog datuma zavisi koje sve Commodity-je tj. RobeIliUsluge (zajedno sa njihovim jedinicama u kojima se sve prodaju) koje server vraca
  selectedDate : Date;

  //servis koji vraca/dodaje BussinesPartnere
  partnerService : PartnerService;

  //servis za GET-ovanje cenovnika (sa pripadajucim Commodity-ima i njihovim jednicama)
  pricelistItemsService : FetchPricelistItemsService;

  //servis za POST-ovanje nove Porudzbenice na server
  invoiceOrderService : OrderServiceService;

  constructor( public servicePartners : PartnerService, public servicePricelistItems : FetchPricelistItemsService, public serviceInvoiceOrder : OrderServiceService) {
    this.partnerService = servicePartners;
    this.pricelistItemsService = servicePricelistItems;
    this.invoiceOrderService = serviceInvoiceOrder;
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

  //every calendar date change resets current values
  onClickCalendar(){
    let x = new Date(this.selectedDate);
    
    //dummy print
    console.log(x.getTime())

    //U slucaju promene datuma: praznimo listu redova za tabelu, setujemo trenutno izabrani Commodity na null i ukupni total setujemo na 0
    this.currentCommodity = null;
    this.orderItems = []
    this.orderTotal = 0;


    //ucitavanje novi podataka sa servera, za novi datum
    this.servicePricelistItems.getPricelistItems(x.getTime().toString()).subscribe(data => { 
      this.commodities = data.commodities;
      console.log(data.commodities.length)
      //console.log(this.commodities.length)
      
      //console.log(data.items)
    } );

  }

  //removing from orderItem's list & decrementing orderTotal
  remove(id: any) {
      var item = this.orderItems[id];
      this.orderItems.splice(id, 1);
      this.orderTotal = this.orderTotal.valueOf() - (item.amount * item.unitPrice)
     
  }

  add() {

    if (this.selectedDate != null && this.currentCommodity != null && this.currentAmount >= 0) {
      
      //console.log("poooooooorez za commodity: " + this.currentItem.commodity.taxRate)

      // let basis =  this.currentAmount.valueOf() * this.currentUnit.price.valueOf();
      // let taxRate = this.currentItem.commodity.taxRate.valueOf()
      // let taxAmt = basis * (taxRate / 100);

      //privremeni objekti koji popunjavaju redove u tabeli
      let tempOrderItem = {

        commodityId : this.currentCommodity.commodityId,
        tax : this.currentCommodity.tax,
        name : this.currentCommodity.name, //commodity name
        description : this.currentCommodity.description, //commodity description
        unit : this.currentCommodity.unitName,
        abbreviation : this.currentCommodity.unitShortName,
        amount : this.currentAmount,
        unitPrice : this.currentCommodity.price,
        taxAmount : (this.currentCommodity.price.valueOf() * this.currentAmount) * (this.currentCommodity.tax.valueOf() / 100)

      }

      console.log("pooorez u temp obj: " + tempOrderItem.taxAmount.valueOf())

      this.orderTotal = this.orderTotal.valueOf() + (tempOrderItem.amount * tempOrderItem.unitPrice.valueOf() + tempOrderItem.taxAmount.valueOf())
      
      this.orderItems.push(tempOrderItem)

    }
    

  }



  //setuje listu jedinica za odredjeni commodity
  onClickedCommodity() {
    //this.currentCommodity = this.currentCommodity
  }

  onClickedPartner(){ 
  
  }

  makeOrder(){
    var newOrder = {orderItem : [], bussinesPartnerId : -1, totalBasis : 0, totalTax : 0, total : 0, totalWithoutTax : 0, totalWithTax  : 0};
   

        var totalBas = 0;
        var totalT = 0;

        this.orderItems.forEach(i => {

          var tempOrderItem = <OrderItem>{};

          tempOrderItem.commodityId = i.commodityId;
          tempOrderItem.amount = i.amount;
          tempOrderItem.unitPrice = i.unitPrice;
          tempOrderItem.basis = tempOrderItem.amount.valueOf() * tempOrderItem.unitPrice.valueOf();
          tempOrderItem.taxPercentage = i.tax;
          tempOrderItem.taxAmount = i.taxAmount;
          tempOrderItem.total = tempOrderItem.basis.valueOf() + tempOrderItem.taxAmount.valueOf();

          totalBas += tempOrderItem.basis.valueOf();
          totalT += tempOrderItem.taxAmount.valueOf();

          newOrder.orderItem.push(tempOrderItem);
        })

    newOrder["bussinesPartnerId"] = this.currentPartner.id.valueOf();
    newOrder["totalBasis"] = totalBas;
    newOrder["totalTax"] = totalT;
    newOrder["totalWithoutTax"] = this.orderTotal.valueOf();
    newOrder["total"] = newOrder["totalTax"] + newOrder["totalBasis"];


    //console.log(newOrder)

    this.invoiceOrderService.makeOrder(newOrder).subscribe(data => {
      if (!data.error || data.code != 200){
        alert("Order succesfully created")
      } else {
        alert("Order is not created")
      }

      this.orderTotal = 0;
      this.orderItems = [];

    })


      
  }
    

}//class
