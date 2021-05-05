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
      this.person = {
        id: this.person.id,
        firstName: this.personForm.get('firstName').value,
        lastName: this.personForm.get('lastName').value,
        idNumber: this.personForm.get('idCode').value,
        isCash: this.personForm.get('isCash').value,
        additionalInfo: this.personForm.get('additionalInfo').value,
        eventId: this.person.eventId
    }
    console.log("Updated person:" + this.person)
    this.personService.updatePerson(this.person)
      .subscribe(() => { this.router.navigateByUrl('/participants/' + this.person.eventId)})
  }

  setUpForm(){
      this.personForm.patchValue({
        firstName: this.person.firstName,
        lastName: this.person.lastName,
        idCode: this.person.idNumber,
        isCash: this.person.isCash,
        additionalInfo: this.person.additionalInfo,
      });
  }

  goBack() {
    this._location.back();
  }

}
