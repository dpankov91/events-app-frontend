import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CompanyService} from "../shared/services/company.service";
import {CompanyModel} from "../shared/models/companyModel";

@Component({
  selector: 'app-create-company-form',
  templateUrl: './create-company-form.component.html',
  styleUrls: ['./create-company-form.component.scss']
})
export class CreateCompanyFormComponent implements OnInit {
  company: CompanyModel
  isCashList: any = ['Sularaha', 'Pangakaart']
  id: number | undefined
  companyForm = new FormGroup({
    companyName: new FormControl(''),
    companyCode: new FormControl(''),
    isCash: new FormControl(''),
    additionalInfo: new FormControl('')
  })
  constructor(private companyService: CompanyService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
  }

  saveCompany() {
    this.company = {
      companyName: this.companyForm.get('companyName').value,
      companyCode: this.companyForm.get('companyCode').value,
      additionalInfo: this.companyForm.get('additionalInfo').value,
      isCash: this.companyForm.get('isCash').value,
      eventId: this.id
    }
    this.companyService.createCompany(this.company)
      .subscribe(() => {
        this.router.navigateByUrl('');
      });
  }

  goBack() {
    this.router.navigateByUrl('');
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
