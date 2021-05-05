import { Component, OnInit } from '@angular/core';
import {CompanyModel} from "../../shared/models/companyModel";
import {FormControl, FormGroup} from "@angular/forms";
import {PersonModel} from "../../shared/models/personModel";
import {CompanyService} from "../../shared/services/company.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {PersonService} from "../../shared/services/person.service";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent implements OnInit {
  person: PersonModel
  isCash: boolean | undefined
  isCashList: any = ['Sularaha', 'Pangakaart']
  id: number | undefined
  personForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    idCode: new FormControl(''),
    isCash: new FormControl(''),
    additionalInfo: new FormControl('')
  })
  constructor(private personService: PersonService,
              private router: Router, private route: ActivatedRoute,
              private _location: Location) { }

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(): Promise<void>{
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
    await this.personService.getPersonById(this.id)
      .then(pFromRest => {
        this.person = pFromRest;
        console.log(this.person)
      });
    this.setUpForm();
  }

  updatePerson() {
    if(this.personForm.get('isCash').value == 'Sularaha') {
      this.person = {
        id: this.person.id,
        firstName: this.personForm.get('firstName').value,
        lastName: this.personForm.get('lastName').value,
        idNumber: this.personForm.get('idCode').value,
        isCash: true,
        additionalInfo: this.personForm.get('additionalInfo').value,
        eventId: this.id
      }
    }
    else if(this.personForm.get('isCash').value == 'Pangakaart'){
      this.person = {
        id: this.person.id,
        firstName: this.personForm.get('firstName').value,
        lastName: this.personForm.get('lastName').value,
        idNumber: this.personForm.get('idCode').value,
        isCash: false,
        additionalInfo: this.personForm.get('additionalInfo').value,
        eventId: this.id
      }
    }
    console.log("Updated company:" + this.person)
    this.personService.updatePerson(this.person)
      .subscribe(() => {  })
  }

  setUpForm(){
    console.log("setting up form " + this.person.isCash)
    if(this.person.isCash == true){
      this.personForm.patchValue({
        firstName: this.person.firstName,
        lastName: this.person.lastName,
        idCode: this.person.idNumber,
        isCash: this.isCashList[0],
        additionalInfo: this.person.additionalInfo,
      });
    }
    else{
      this.personForm.patchValue({
        firstName: this.person.firstName,
        lastName: this.person.lastName,
        idNumber: this.person.idNumber,
        isCash: this.isCashList[1],
        additionalInfo: this.person.additionalInfo,
      });
    }
    console.log("after set up: " + this.personForm.get('isCash').value)
  }

  goBack() {
    this._location.back();
  }

}
