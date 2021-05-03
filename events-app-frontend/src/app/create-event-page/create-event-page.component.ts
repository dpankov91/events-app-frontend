import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {EventService} from "../shared/services/event.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.scss']
})
export class CreateEventPageComponent implements OnInit {

  eventForm = new FormGroup({
    eventName: new FormControl(''),
    eventDate: new FormControl(''),
    place: new FormControl(''),
    additionalInfo: new FormControl('')
  })

  constructor(private eventService: EventService,
              private router: Router) { }

  ngOnInit(): void {
  }

  saveEvent(): void {
    const event = this.eventForm.value;
    this.eventService.createEvent(event)
      .subscribe(()   => {
        this.router.navigateByUrl('');
      });
  }
}
