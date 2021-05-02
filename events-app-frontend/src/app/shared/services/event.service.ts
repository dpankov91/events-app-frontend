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

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  deleteEvent(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
