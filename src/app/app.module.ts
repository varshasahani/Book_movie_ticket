import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule, rountingComponents } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutPopup, SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';

import { DashboardComponent } from './dashboard/dashboard.component';

import { MovieService } from './movie.service';

import { HttpClientModule } from '@angular/common/http';
import { MovieFormComponent, PaymentPopup } from './dashboard/movie-form/movie-form.component';
import { DatePipe } from '@angular/common';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BookingsComponent, DeletePopup } from './bookings/bookings.component';
import { EditFormComponent } from './edit-form/edit-form.component';





@NgModule({
  declarations: [
    AppComponent,
    rountingComponents,
    LoginComponent,
    SidebarComponent,
    DashboardComponent,
    MovieFormComponent,
    LogoutPopup,
    PaymentPopup,
    BookingsComponent,
    DeletePopup,
    EditFormComponent



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    LayoutModule,

    HttpClientModule,
    ReactiveFormsModule


  ],
  providers: [MovieService, DatePipe, { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
