import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchTicketsComponent } from './components/search-tickets/search-tickets.component';
import { LoginComponent } from './components/login/login.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FindReservationComponent } from './components/find-reservation/find-reservation.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { Role } from './entity/role';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './components/home/home.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { UserDetailComponent } from './components/admin/user-detail/user-detail.component';
import { TicketListComponent } from './components/admin/ticket-list/ticket-list.component';
import { BusListComponent } from './components/admin/bus-list/bus-list.component';
import { BusDetailComponent } from './components/admin/bus-detail/bus-detail.component';
import { BusStopListComponent } from './components/admin/bus-stop-list/bus-stop-list.component';
import { SeatDetailComponent } from './components/admin/seat-detail/seat-detail.component';
import { BusStopDetailComponent } from './components/admin/bus-stop-detail/bus-stop-detail.component';
import { UserTicketsComponent } from './components/user-tickets/user-tickets.component';
import { TicketDetailsComponent } from './components/admin/ticket-details/ticket-details.component';
import { NewBusComponent } from './components/admin/new-bus/new-bus.component';


const routes: Routes = [
  {path: '',  component:SearchTicketsComponent},
  {path: 'welcome',  component:SearchTicketsComponent},
  
  {path: "buyTicket/:id/:origin/:arrival", component:BuyTicketComponent},
  {path: "signup", component:SignupComponent},
  {path: 'home', component:DashboardComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN]} },
   {path: 'home', component:SearchTicketsComponent, canActivate: [AuthGuard], data: { roles: [Role.USER]} },
  {path: "findReservation", component:FindReservationComponent},
  {path: "login", component:LoginComponent},
  {path: "confirm/:reservationNumber", component:ConfirmationComponent},
  {path: "confirmation/:reservationNumber", component:TicketDetailsComponent, canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path: "dashboard",component:DashboardComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"user-list", component:UserListComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"user-detail/:id", component:UserDetailComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"ticket-list", component:TicketListComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"tickets", component:UserTicketsComponent,canActivate: [AuthGuard],  data: { roles: [Role.USER]}},
  {path:"bus-list", component:BusListComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"user-list", component:UserListComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"bus/:id", component:BusDetailComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"busStops/:id", component:BusStopListComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"seat/:id", component:SeatDetailComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"bus-stop/:id", component:BusStopDetailComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"bus-stop/:id/:busStopId", component:BusStopDetailComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}},
  {path:"new-bus", component:NewBusComponent,canActivate: [AuthGuard],  data: { roles: [Role.ADMIN]}}


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
