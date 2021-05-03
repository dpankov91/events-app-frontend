import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "../models/eventModel";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl: string = 'https://localhost:44302/api/event';

  constructor(private http: HttpClient) { }

  async getAllEvents(): Promise<EventModel[]> {
    const uspromise = await this.http.get<EventModel[]>(this.apiUrl).toPromise()
    return uspromise.map(a=>{
      const id = a.id
      const eventName = a.eventName;
      const eventDate = a.eventDate;
      const place = a.place;
      const additionalInfo = a.additionalInfo;
    return {id, eventName, eventDate, place, additionalInfo} as EventModel;
    })
  }

  deleteEvent(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/' + id);
  }

  createEvent(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.apiUrl, event);
  }

  getEventById(id: number): Observable<EventModel>{
    return this.http.get<EventModel>(this.apiUrl + '/' + id);
  }
}
