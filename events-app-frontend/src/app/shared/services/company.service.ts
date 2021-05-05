import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PersonModel} from "../models/personModel";
import {Observable} from "rxjs";
import {CompanyModel} from "../models/companyModel";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiUrl: string = 'https://localhost:44302/api/company';

  constructor(private http: HttpClient) { }

  async getAllCompanies(): Promise<CompanyModel[]> {
    const uspromise = await this.http.get<CompanyModel[]>(this.apiUrl).toPromise()
    return uspromise.map( a=>{
      const id = a.id
      const companyName = a.companyName;
      const companyCode = a.companyCode;
      const isCash = a.isCash;
      const additionalInfo = a.additionalInfo;
      const eventId = a.eventId
      return {id, companyName, companyCode, isCash, additionalInfo, eventId} as CompanyModel;
    })
  }

  deleteCompany(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/' + id);
  }

  createCompany(company: CompanyModel): Observable<CompanyModel> {
    return this.http.post<CompanyModel>(this.apiUrl, company);
  }

  async getCompanyById(id: number): Promise<CompanyModel>{
    const uspromise = await this.http.get<CompanyModel>(this.apiUrl + '/' + id).toPromise();
    return uspromise as CompanyModel;
  }

  updateCompany(company: CompanyModel): Observable<CompanyModel> {
    return this.http.put<CompanyModel>(this.apiUrl + '/' + company.id, company);
  }
}
