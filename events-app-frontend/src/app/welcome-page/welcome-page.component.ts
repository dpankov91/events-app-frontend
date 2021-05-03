import { Component, OnInit } from '@angular/core';
import {EventService} from "../shared/services/event.service";
import {EventModel} from "../shared/models/eventModel";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  selectedEventId: number = null;
  allEvents: EventModel[] = []
  futureEvents: EventModel[] = []
  pastEvents: EventModel[] = []
  today = new Date();
  constructor(private eventService: EventService, public datePipe: DatePipe,
              private router: Router) { }

  ngOnInit(): void {
    this.refresh()
  }

  async refresh(): Promise<void> {
    await this.eventService.getAllEvents().then(evLst => {this.allEvents = evLst});
    let latest_date = this.datePipe.transform(this.today, 'yyyy-MM-dd');
    this.futureEvents = this.allEvents.filter(event =>
      this.datePipe.transform(event.eventDate, 'yyyy-MM-dd').valueOf() >= latest_date.valueOf())
    this.pastEvents = this.allEvents.filter(event =>
      this.datePipe.transform(event.eventDate, 'yyyy-MM-dd').valueOf() < latest_date.valueOf() )
  }

  delete(id: number) {
    this.eventService.deleteEvent(id)
      .subscribe(() => {
        this.refresh();
      });
  }

  selectEvent(event: EventModel) {
    this.router.navigate(['/participants', event.id])
  }
}
