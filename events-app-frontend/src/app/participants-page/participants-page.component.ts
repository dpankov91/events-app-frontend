import { Component, OnInit } from '@angular/core';
import {EventService} from "../shared/services/event.service";
import {WelcomePageComponent} from "../welcome-page/welcome-page.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {EventModel} from "../shared/models/eventModel";
import {PersonModel} from "../shared/models/personModel";
import {PersonService} from "../shared/services/person.service";
import {CompanyService} from "../shared/services/company.service";
import {CompanyModel} from "../shared/models/companyModel";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.scss']
})
export class ParticipantsPageComponent implements OnInit {

  company: CompanyModel
  isCashList: any = ['Sularaha', 'Pangakaart']
  id: number | undefined
  companyForm = new FormGroup({
    companyName: new FormControl(''),
    companyCode: new FormControl(''),
    isCash: new FormControl(''),
    additionalInfo: new FormControl('')
  })
  person: PersonModel
  personForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    idCode: new FormControl(''),
    isCash: new FormControl(''),
    additionalInfo: new FormControl('')
  })
  allPersons: PersonModel[] = []
  selectedEventPersons: PersonModel[] = []
  allCompanies: CompanyModel[] = []
  selectedEventCompanies: CompanyModel[] = []
  event: EventModel;
  private selectedEventId: number;

   isCompany = false;


  constructor(private eventService: EventService, private welcomeComponent: WelcomePageComponent,
              private route: ActivatedRoute, private personService: PersonService,
              private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(): Promise<void> {
    let id = parseInt(this.route.snapshot.paramMap.get('id'))
    this.selectedEventId = id;
    this.eventService.getEventById(id)
      .subscribe(eventFromRest => {
        this.event = eventFromRest
      });
    await this.personService.getAllPersons().then(pLst => {this.allPersons = pLst});
    this.selectedEventPersons = this.allPersons.filter(person =>
      person.eventId == id)
    await this.companyService.getAllCompanies().then(cLst => {this.allCompanies = cLst});
    this.selectedEventCompanies = this.allCompanies.filter(company =>
      company.eventId == id)
  }

  deletePerson(id: number) {
    this.personService.deletePerson(id)
      .subscribe(() => {
        this.refresh();
      });
  }

  deleteCompany(id: number) {
    this.companyService.deleteCompany(id)
      .subscribe(() => {
        this.refresh();
      });
  }

  goEditCompany(company: CompanyModel) {
    this.router.navigate(['/participants/edit-company/', company.id])
  }

  goEditPerson(person: PersonModel) {
    this.router.navigate(['/participants/edit-person/', person.id])
  }

  saveCompany() {
    this.company = {
      companyName: this.companyForm.get('companyName').value,
      companyCode: this.companyForm.get('companyCode').value,
      additionalInfo: this.companyForm.get('additionalInfo').value,
      isCash: this.companyForm.get('isCash').value,
      eventId: this.selectedEventId
    }
    console.log(this.company)
    this.companyService.createCompany(this.company)
      .subscribe(() => {
        this.refresh();
      });
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

  changeForm($event: Event) {
    this.isCompany = this.isCompany === false;
  }
}
