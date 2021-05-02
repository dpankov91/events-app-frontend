import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Event} from "../models/event";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl: string = 'https://localhost:44302/api/event';

  constructor(private http: HttpClient) { }

  async getAllEvents(): Promise<Event[]> {
    const uspromise = await this.http.get<Event[]>(this.apiUrl).toPromise()
    return uspromise.map(a=>{
      console.log(a);
      const eventName = a.eventName;
      const eventDate = a.eventDate;
      const place = a.place;
      const additionalInfo = a.additionalInfo;
    return {eventName, eventDate, place, additionalInfo} as Event;
    })
  }

  deleteEvent(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
