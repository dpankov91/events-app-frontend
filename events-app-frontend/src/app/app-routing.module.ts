import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {CreateEventPageComponent} from "./create-event-page/create-event-page.component";

const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'create-event', component: CreateEventPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
