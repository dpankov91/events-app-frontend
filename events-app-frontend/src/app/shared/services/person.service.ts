import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventModel} from "../models/eventModel";
import {PersonModel} from "../models/personModel";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  apiUrl: string = 'https://localhost:44302/api/person';

  constructor(private http: HttpClient) { }

  async getAllPersons(): Promise<PersonModel[]> {
    const uspromise = await this.http.get<PersonModel[]>(this.apiUrl).toPromise()
    return uspromise.map( a=>{
      const id = a.id
      const firstName = a.firstName;
      const lastName = a.lastName;
      const idNumber = a.idNumber;
      const isCash = a.isCash;
      const additionalInfo = a.additionalInfo;
      const eventId = a.eventId
      return {id, firstName, lastName, idNumber, isCash, additionalInfo, eventId} as PersonModel;
    })
  }

  deletePerson(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/' + id);
  }

  createPerson(person: PersonModel): Observable<PersonModel> {
    return this.http.post<PersonModel>(this.apiUrl, person);
  }

  getPersonById(id: number): Observable<PersonModel>{
    return this.http.get<PersonModel>(this.apiUrl + '/' + id);
  }
}
