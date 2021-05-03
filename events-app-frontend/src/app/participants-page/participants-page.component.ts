import { Component, OnInit } from '@angular/core';
import {EventService} from "../shared/services/event.service";

@Component({
  selector: 'app-participants-page',
  templateUrl: './participants-page.component.html',
  styleUrls: ['./participants-page.component.scss']
})
export class ParticipantsPageComponent implements OnInit {

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

}
