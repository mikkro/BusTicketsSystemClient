import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BusStop } from '../entity/bus-stop';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BusQuery } from '../entity/bus-query';
import { Bus } from '../entity/bus';
import { Seat } from '../entity/seat';
import { User } from '../entity/user';
import { Ticket } from '../entity/ticket';


let API_URL = "http://localhost:8080/user/";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  
  
    selectedBus: Subject<Bus> = new Subject<Bus>();

  
  
  getBus(busId: string, origin:string, destination:string) {
    return this.http.get<Bus>(API_URL + "route/"+busId +"/"+origin+"/"+destination, {headers: {"Content-Type":"application/json; charset=UTF-8"}});

  }


  getRoute(busQuery:BusQuery):Observable<any> {
    return this.http.post<Bus[]>(API_URL + "route", JSON.stringify(busQuery), {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
  


  constructor(private http:HttpClient) { }

  getBusStops():Observable<String[]> {
    // return this.http.get<BusStop[]>(API_URL + "busstops", {headers: {"Content-Type":"application/json; charset=UTF-8"}});
    return this.http.get<String[]>(API_URL + "busstops", {headers: {"Content-Type":"application/json; charset=UTF-8"}});

  }

  selectBus(bus:Bus){
    console.log(bus);
    this.selectedBus.next(bus);
    console.log(this.selectedBus);
  }


  buyTicket(ticket:Ticket):Observable<Ticket> {
    return this.http.post<Ticket>(API_URL + "buyTicket", JSON.stringify(ticket), {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  getConfirmation(reservationNumber:string):Observable<Ticket>{
    return this.http.get<Ticket>(API_URL +"confirmation/" + reservationNumber, {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
  
  getAllMyTickets(id: number):Observable<Ticket[]> {
    return this.http.get<Ticket[]>(API_URL + "tickets/" + id, {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

}
