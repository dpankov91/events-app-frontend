import { Component, OnInit } from '@angular/core';
import {PersonModel} from "../../shared/models/personModel";
import {FormControl, FormGroup} from "@angular/forms";
import {PersonService} from "../../shared/services/person.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-new-person',
  templateUrl: './create-new-person.component.html',
  styleUrls: ['./create-new-person.component.scss']
})
export class CreateNewPersonComponent implements OnInit {
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
}
