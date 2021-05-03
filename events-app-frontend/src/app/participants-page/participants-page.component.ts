import { Component, OnInit } from '@angular/core';
import {EventService} from "../shared/services/event.service";
import {WelcomePageComponent} from "../welcome-page/welcome-page.component";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {EventModel} from "../shared/models/eventModel";
import {PersonModel} from "../shared/models/personModel";
import {PersonService} from "../shared/services/person.service";

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.scss']
})
export class ParticipantsPageComponent implements OnInit {

  allPersons: PersonModel[] = []
  selectedEventPersons: PersonModel[] = []
  event: EventModel;
  private selectedEventId: number;


  constructor(private eventService: EventService, private welcomeComponent: WelcomePageComponent,
              private route: ActivatedRoute, private personService: PersonService) {}

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
    console.log(this.selectedEventPersons)

  }

  deletePerson(id: number) {
    this.personService.deletePerson(id)
      .subscribe(() => {
        this.refresh();
      });
  }
}
