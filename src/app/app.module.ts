import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavlistComponent } from './components/navigation/sidenavlist/sidenavlist.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchTicketsComponent } from './components/search-tickets/search-tickets.component';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FindReservationComponent } from './components/find-reservation/find-reservation.component';
import { AdminTemplateComponent } from './components/admin-template/admin-template.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { BusListComponent } from './components/admin/bus-list/bus-list.component';
import { BusStopListComponent } from './components/admin/bus-stop-list/bus-stop-list.component';
import { UserDetailComponent } from './components/admin/user-detail/user-detail.component';
import { TicketListComponent } from './components/admin/ticket-list/ticket-list.component';
import { BusDetailComponent } from './components/admin/bus-detail/bus-detail.component';
import { BusStopDetailComponent } from './components/admin/bus-stop-detail/bus-stop-detail.component';
import { SeatDetailComponent } from './components/admin/seat-detail/seat-detail.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule,OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { UserTicketsComponent } from './components/user-tickets/user-tickets.component';
import { TicketDetailsComponent } from './components/admin/ticket-details/ticket-details.component';
import { NewBusComponent } from './components/admin/new-bus/new-bus.component';

export const MY_NATIVE_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric'},
  timePickerInput: {hour: 'numeric', minute: 'numeric'},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavlistComponent,
    LoginComponent,
    SignupComponent,
    SearchTicketsComponent,
    BuyTicketComponent,
    ConfirmationComponent,
    FindReservationComponent,
    AdminTemplateComponent,
    DashboardComponent,
    HomeComponent,
    UserListComponent,
    BusListComponent,
    BusStopListComponent,
    UserDetailComponent,
    TicketListComponent,
    BusDetailComponent,
    BusStopDetailComponent,
    SeatDetailComponent,
    UserTicketsComponent,
    TicketDetailsComponent,
    NewBusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, FlexLayoutModule, FormsModule,ReactiveFormsModule,
    HttpClientModule, 
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_NATIVE_FORMATS},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
