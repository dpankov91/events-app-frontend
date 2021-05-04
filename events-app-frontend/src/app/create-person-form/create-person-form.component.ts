import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PersonService} from "../shared/services/person.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonModel} from "../shared/models/personModel";

@Component({
  selector: 'app-create-person-form',
  templateUrl: './create-person-form.component.html',
  styleUrls: ['./create-person-form.component.scss']
})
export class CreatePersonFormComponent implements OnInit {
  isCashList: any = ['Sularaha', 'Pangakaart']
  id: number | undefined
  person: PersonModel
  personForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    idCode: new FormControl(''),
    isCash: new FormControl(''),
    additionalInfo: new FormControl('')
  })

  constructor(private personService: PersonService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'))
  }

  goBack() {
    this.router.navigateByUrl('');
  }

  savePerson() {
     this.person = {
      firstName: this.personForm.get('firstName').value,
      lastName: this.personForm.get('lastName').value,
      idNumber: this.personForm.get('idCode').value,
      additionalInfo: this.personForm.get('additionalInfo').value,
       isCash: this.personForm.get('isCash').value,
       eventId: this.id
     }
    console.log(this.person + this.personForm.get('isCash').value)
    this.personService.createPerson(this.person)
      .subscribe(() => {
        this.personForm.reset()
      });
  }

  changePayMethod(e: any) {
    this.personForm.get('isCash').setValue(e.target.value, {})
    if(this.personForm.get('isCash').value == 'Sularaha'){
      this.personForm.get('isCash').setValue(true);
    }
    if(this.personForm.get('isCash').value == 'Pangakaart'){
      this.personForm.get('isCash').setValue(false);
    }
  }
}



