import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoginComponent } from './login/login.component';
import { MovieFormComponent } from './dashboard/movie-form/movie-form.component';
import { BookingsComponent } from './bookings/bookings.component';
import { EditFormComponent } from './edit-form/edit-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: DashboardComponent },
  { path: 'myBookings', component: BookingsComponent },
  { path: 'movie-form/0', component: MovieFormComponent },
  { path: 'movie-form/:id', component: MovieFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const rountingComponents = [DashboardComponent, LoginComponent, MovieFormComponent, BookingsComponent, EditFormComponent]
