import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {


  private priceListIdSource = new BehaviorSubject<number>(12);
  priceListForCopyId = this.priceListIdSource.asObservable();
  
  private increaseSource = new BehaviorSubject<boolean>(false);
  increase = this.increaseSource.asObservable();


  
  private percenrageSource = new BehaviorSubject<number>(12.5);
  percenrage = this.percenrageSource.asObservable();

  constructor() { }

  changePriceListForCopyId(priceListForCopyId: number) {
    this.priceListIdSource.next(priceListForCopyId);
  }

  changeProcenat(newPercentage: number) {
    this.percenrageSource.next(newPercentage);
  }

  changeIncrease(isIncrease:boolean){
    this.increaseSource.next(isIncrease)
  }


}
