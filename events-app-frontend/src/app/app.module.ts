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
import { CreatePersonFormComponent } from './create-person-form/create-person-form.component';
import { CreateCompanyFormComponent } from './create-company-form/create-company-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CreateEventPageComponent,
    WelcomePageComponent,
    ParticipantsPageComponent,
    CreatePersonFormComponent,
    CreateCompanyFormComponent
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
