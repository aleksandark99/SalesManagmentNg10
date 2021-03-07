import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaxServiceService } from '../../service/tax-service.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})
export class TaxComponent implements OnInit {
  groups: any = [];
  currentGroup: any;
  selectedDate: Date;
  groupName: String;
  taxPercenrage;

  taxes: any[];
  constructor(private taxService: TaxServiceService) { }

  ngOnInit(): void {
    this.taxService.getGroups().subscribe(data => {
      console.warn(data)
      this.groups = data;
    })
  }

  onClickedGroupList() {
    this.taxes = this.currentGroup.taxes;
    this.currentGroup.taxes.forEach(element => {
      element.validFrom = this.convertDate(element.validFrom)

    });
    // alert(this.currentGroup.name)


  }

  addGroup() {
    if (this.groupName.length > 2) {
      // alert(this.groupName)
        this.taxService.addGroup(this.groupName).subscribe(data=>{
          alert(data);
          this.groups.push(data)
        })

    } else {
      alert("You must enter group name with length of at least 3 letters")

    }
  }

  convertDate(milis): String {
    console.warn(milis)
    var date = new Date(parseInt(milis));
    console.warn(date)
    return date.toLocaleDateString();
  }

  addTax() {
    this.validateDate(this.selectedDate)
    if (this.taxPercenrage > 0 && this.currentGroup != null && this.validateDate(this.selectedDate)) {
      console.warn(new Date(this.selectedDate).getTime().toString())
      console.warn(this.taxPercenrage)
      console.warn(this.currentGroup.id)
      let dateToSend=new Date(this.selectedDate).getTime().toString();
      this.taxService.addTax(dateToSend,this.currentGroup.id,this.taxPercenrage).subscribe(data=>{
        this.taxes.push(data)
      })
    }
  }

  validateDate(date:any){
    let currentDate=new Date();
    let dat=new Date(date)
    if ( !isNaN(dat.getTime()) && dat>= currentDate )
      {
        return true;
      }else{
        return false;
      }

  }
}
