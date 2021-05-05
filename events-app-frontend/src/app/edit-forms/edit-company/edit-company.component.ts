import { Component, OnInit } from '@angular/core';
import {CompanyModel} from "../../shared/models/companyModel";
import {FormControl, FormGroup} from "@angular/forms";
import {CompanyService} from "../../shared/services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  company: CompanyModel
  isCash: boolean | undefined
  isCashList: any = ['Sularaha', 'Pangakaart']
  id: number | undefined
  companyForm = new FormGroup({
    companyName: new FormControl(''),
    companyCode: new FormControl(''),
    isCash: new FormControl(''),
    additionalInfo: new FormControl('')
  })
  constructor(private companyService: CompanyService,
              private router: Router, private route: ActivatedRoute,
              private _location: Location) { }

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(): Promise<void>{
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
    await this.companyService.getCompanyById(this.id)
      .then(cpFromRest => {
        this.company = cpFromRest;
        console.log(this.company)
      });
    this.setUpForm();
  }

  updateCompany() {
    if(this.companyForm.get('isCash').value == 'Sularaha') {
      this.company = {
        id: this.company.id,
        companyName: this.companyForm.get('companyName').value,
        companyCode: this.companyForm.get('companyCode').value,
        additionalInfo: this.companyForm.get('additionalInfo').value,
        isCash: true,
        eventId: this.id
      }
    }
    else if(this.companyForm.get('isCash').value == 'Pangakaart'){
      this.company = {
        id: this.company.id,
        companyName: this.companyForm.get('companyName').value,
        companyCode: this.companyForm.get('companyCode').value,
        additionalInfo: this.companyForm.get('additionalInfo').value,
        isCash: false,
        eventId: this.id
      }
    }
    console.log("Updated company:" + this.company)
    this.companyService.updateCompany(this.company)
      .subscribe(() => {  })
  }

  setUpForm(){
    console.log("setting up form " + this.company.isCash)
    if(this.company.isCash == true){
      this.companyForm.patchValue({
        companyName: this.company.companyName,
        companyCode: this.company.companyCode,
        isCash: this.isCashList[0],
        additionalInfo: this.company.additionalInfo,
      });
    }
    else{
      this.companyForm.patchValue({
        companyName: this.company.companyName,
        companyCode: this.company.companyCode,
        isCash: this.isCashList[1],
        additionalInfo: this.company.additionalInfo,
      });
    }
    console.log("after set up: " + this.companyForm.get('isCash').value)
  }

  changePayMethod(e: any) {
    this.companyForm.get('isCash').setValue(e.target.value, {})
    if(this.companyForm.get('isCash').value == 'Sularaha'){
      this.companyForm.get('isCash').setValue(true);
    }
    if(this.companyForm.get('isCash').value == 'Pangakaart'){
      this.companyForm.get('isCash').setValue(false);
    }
  }
  goBack() {
    this._location.back();
  }
}
