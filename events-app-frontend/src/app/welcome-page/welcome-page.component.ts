import { Component, OnInit } from '@angular/core';
import {EventService} from "../shared/services/event.service";
import {Event} from "../shared/models/event";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  allEvents: Event[] = []
  futureEvents: Event[] = []
  pastEvents: Event[] = []
  today = new Date();
  constructor(private eventService: EventService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.refresh()
  }

  refresh(): void {
    this.eventService.getAllEvents().subscribe(evLst => {this.allEvents = evLst;})
    let latest_date = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    console.log(latest_date)
    console.log(this.allEvents)
    this.futureEvents = this.allEvents.filter(event =>
      this.datePipe.transform(event.eventDate, 'yyyy-MM-dd').valueOf() > latest_date.valueOf() )
  }

  delete(id: number) {
    this.eventService.deleteEvent(id)
      .subscribe(message => {
        console.log('Deleted user, got message:' + message + id);
        this.refresh();
      });
  }
}
