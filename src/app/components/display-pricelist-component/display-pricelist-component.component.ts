import { Component, OnInit } from '@angular/core';
import { PricelistDto } from 'src/app/interfaces_responses/pricelist-dto';
import { PricelistDetailDto } from 'src/app/interfaces_responses/pricelist-detail-dto';
import { PriceListService } from 'src/app/service/price-list.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-display-pricelist-component',
  templateUrl: './display-pricelist-component.component.html',
  styleUrls: ['./display-pricelist-component.component.scss']
})
export class DisplayPricelistComponentComponent implements OnInit {

  //tri globalne varijable koriscene za kopiranja cenovnika
  increase : Boolean;
  increaseRatePercentage : Number;
  pricelistId : Number

  //trenutno izabrani cenovnik
  currentPricelist : PricelistDto;

  //cenovnici iz dropdown-a, predstvljeni sa PK i datumom od kada vazi
  pricelists : PricelistDto[] = [];

  //svi Commodity artikli za izabrani cenovnik iz liste 'pricelists'
  pricelistsDetails : PricelistDetailDto[] = [];

  //reaktivne Angular forme
  controlsFormGroup : FormGroup;
  radioExample : FormControl = new FormControl('', [Validators.required]);
  numberInput : FormControl = new FormControl('', [Validators.required, Validators.min(0.1)]);

  //servis za fetch-ovanje Pricelist-a sa datumom vazanje i njegovim PK
  pricelistService : PriceListService;

  constructor(pricelistService : PriceListService, private formBuilder : FormBuilder) {
    
    this.pricelistService = pricelistService;
     
    this.controlsFormGroup = this.formBuilder.group({
      radioExample : this.radioExample,
      numberInput : this.numberInput
    })

  }

  ngOnInit(): void {

    this.pricelistService.getPricelists().subscribe(data => this.pricelists = data.items);
    
    //jos jedan nacin da osluskujemo promene na reaktivnoj formi
    //this.controlsFormGroup.get('radioExample').valueChanges.subscribe(value =>  console.log(value))
  }

  //za izabrani cenovnik poziva se servis za sve Commodity-je iz tog cenovnika
  onClickedPricelist(){

    let pricelistId = this.currentPricelist.pricelistId  

    if (pricelistId > 0){
      this.pricelistService.getPricelistDetails(pricelistId).subscribe( data => {
        this.pricelistsDetails = data.details;
      })
    }

    
  }

  //onClick() - za kopiranje cenovnika
  copyPricelistAndCloseModal(modal : any){
    modal.hide()
    console.log("copying pricelist and closing modal")
    if (this.radioExample.value != undefined){
      this.increase = JSON.parse(this.radioExample.value);
      this.increaseRatePercentage = this.numberInput.value;
      this.pricelistId = this.currentPricelist.pricelistId;

    }
  }

}
