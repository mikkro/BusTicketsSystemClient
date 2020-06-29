import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../entity/user';
import { Observable } from 'rxjs';
import { Seat } from '../entity/seat';
import { BusStop } from '../entity/bus-stop';
import { Bus } from '../entity/bus';



let API_URL = "http://localhost:8080/admin/";

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  
  
  
  
  
  
  

  currentUser: User;
  headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new HttpHeaders({
      authorization: 'Bearer ' + this.currentUser.token,
      "Content-Type": "application/json; charset=UTF-8"
    })
  }



  getUsers(): Observable<any>{
    return this.http.get(API_URL + "user-all", {headers:this.headers});
  }

  numberOfUsers(): Observable<any>{
    return this.http.get(API_URL + "user-number", {headers:this.headers});
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(API_URL + "user/"+id, {headers:this.headers});
  }

  getUserById(id:any):Observable<User>{
    return this.http.get<User>(API_URL + "user/"+id, {headers:this.headers})
  }

  getNumberOfTickets():Observable<any>{
    return this.http.get<any>(API_URL + "ticket-number", {headers:this.headers})
  }

  getAllTickets():Observable<any> {
    return this.http.get(API_URL + "ticket-all", {headers:this.headers});
  }

  getAllBusses():Observable<any>{
    return this.http.get(API_URL + "bus-all", {headers:this.headers});
  }

  getBusDetails(id: string):Observable<any> {
    return this.http.get(API_URL + "bus/" + id,{headers:this.headers} );
  }

  getBusStops(id: string):Observable<any> {
    return this.http.get(API_URL + "busStops/" + id,{headers:this.headers} );
  }

  addNewSeat(seat:Seat) {
    return this.http.post(API_URL + "seat", JSON.stringify(seat),{headers:this.headers});
  }

  addNewBusStop(busStop: BusStop) {
    return this.http.post(API_URL + "bus-stop", JSON.stringify(busStop), {headers:this.headers});
  }

  getBusStop(busStopId: string):Observable<any> {
    return this.http.get(API_URL + "bus-stop/"+ busStopId, {headers:this.headers});
  }

  addNewBus(bus:Bus) {
    return this.http.post(API_URL + "new-bus", JSON.stringify(bus), {headers:this.headers});
  }

}
