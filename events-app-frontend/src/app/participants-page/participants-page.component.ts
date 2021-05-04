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

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.scss']
})
export class ParticipantsPageComponent implements OnInit {

  allPersons: PersonModel[] = []
  selectedEventPersons: PersonModel[] = []
  allCompanies: CompanyModel[] = []
  selectedEventCompanies: CompanyModel[] = []
  event: EventModel;
  private selectedEventId: number;


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
    console.log(this.selectedEventCompanies)
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
    this.router.navigate(['/participants/edit-company', company.id])
  }

  goEditPerson(person: PersonModel) {
    this.router.navigate(['/participants/edit-company', person.id])
  }
}
