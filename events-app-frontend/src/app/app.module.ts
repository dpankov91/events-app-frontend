import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './shared/footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule, DatePipe} from "@angular/common";
import {CreateEventPageComponent} from "./create-event-page/create-event-page.component";
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ParticipantsPageComponent } from './participants-page/participants-page.component';
import { CreateNewCompanyComponent } from './create-forms/create-new-company/create-new-company.component';
import { CreateNewPersonComponent } from './create-forms/create-new-person/create-new-person.component';
import { EditCompanyComponent } from './edit-forms/edit-company/edit-company.component';
import {EditPersonComponent} from "./edit-forms/edit-person/edit-person.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CreateEventPageComponent,
    WelcomePageComponent,
    ParticipantsPageComponent,
    CreateNewCompanyComponent,
    CreateNewPersonComponent,
    EditPersonComponent,
    EditCompanyComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [DatePipe, WelcomePageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
