import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {CreateEventPageComponent} from "./create-event-page/create-event-page.component";
import {ParticipantsPageComponent} from "./participants-page/participants-page.component";
import {CreatePersonFormComponent} from "./create-person-form/create-person-form.component";
import {CreateCompanyFormComponent} from "./create-company-form/create-company-form.component";

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'create-event', component: CreateEventPageComponent},
  {path: 'participants/:id', component: ParticipantsPageComponent},
  {path: 'participants/edit-person/:id', component: CreatePersonFormComponent},
  {path: 'participants/edit-company/:id', component: CreateCompanyFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
