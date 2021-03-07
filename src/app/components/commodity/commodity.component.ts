import { Component, OnInit } from '@angular/core';
import { TaxServiceService } from '../../service/tax-service.service';
import { CommodityServiceService } from '../../service/commodity-service.service';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.scss']
})
export class CommodityComponent implements OnInit {
  groups: any = [];
  currentGroup: any;

  units: any = [];
  currentUnit: any;

  name:String="";
  description:String="";
  goods:boolean=false;

  constructor(private taxService: TaxServiceService,private commodityService :CommodityServiceService) { }

  ngOnInit(): void {
    this.taxService.getGroups().subscribe(data => {
      console.warn(data)
      this.groups = data;
    })

    this.commodityService.getUnits().subscribe(data =>{
      this.units=data
    })
  }

  onClickedGroupList() {
    // alert(this.currentGroup.id)
  }
  onClickedUnitList(){
    // alert(this.currentUnit.id)
  }

  addCommodity(){
    if(this.validateCommodity()){
    // console.warn(this.currentUnit.id)
    // console.warn(this.currentGroup.id)
    // console.warn(this.name)
    // console.warn(this.description)
    // console.warn(this.goods)
    this.commodityService.addCommodity(this.makeCommodity()).subscribe(data =>{
      console.warn(data)
    });
    }else{alert("You must enter all fields !")}

  }
  validateCommodity(){
      if(this.currentGroup!=null &&this.currentUnit !=null && this.name.length>0 && this.description.length>0)
        return true
      
      
      return false
  }
  makeCommodity(){
    let groupId=this.currentGroup.id
    let unitId =this.currentUnit.id
    let goods =!this.goods;
    let name = this.name;
    let description= this.description;
    let commodityToSend={groupId,unitId,goods,name,description};
    return commodityToSend;
  }

}
