import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {CreateEventPageComponent} from "./create-event-page/create-event-page.component";
import {ParticipantsPageComponent} from "./participants-page/participants-page.component";
import {EditPersonComponent} from "./edit-forms/edit-person/edit-person.component";
import {EditCompanyComponent} from "./edit-forms/edit-company/edit-company.component";

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'create-event', component: CreateEventPageComponent},
  {path: 'participants/:id', component: ParticipantsPageComponent},
  {path: 'participants/edit-person/:id', component: EditPersonComponent},
  {path: 'participants/edit-company/:id', component: EditCompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
