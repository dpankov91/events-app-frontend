import { Component, OnInit } from '@angular/core';
import {CompanyModel} from "../../shared/models/companyModel";
import {FormControl, FormGroup} from "@angular/forms";
import {CompanyService} from "../../shared/services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-new-company',
  templateUrl: './create-new-company.component.html',
  styleUrls: ['./create-new-company.component.scss']
})
export class CreateNewCompanyComponent implements OnInit {
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

    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
  }

  goBack() {
    this._location.back();
  }

  saveCompany() {
    this.company = {
      companyName: this.companyForm.get('companyName').value,
      companyCode: this.companyForm.get('companyCode').value,
      isCash: this.companyForm.get('isCash').value,
      additionalInfo: this.companyForm.get('additionalInfo').value,
      eventId: this.id
    }
    console.log(this.company + this.companyForm.get('isCash').value)
    this.companyService.createCompany(this.company)
      .subscribe(() => {
        this.companyForm.reset()
      });
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
}
