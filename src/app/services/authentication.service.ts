import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from './authentication-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { User } from '../entity/user';
import { map } from 'rxjs/operators';


let API_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  


  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  // authChange = new Subject<boolean>();

  constructor(private httpClient:HttpClient, private router:Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user:User):Observable<any>{
    const headers = new HttpHeaders(user ? {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password)
    } : {});

    return this.httpClient.get<any>(API_URL + "user/login", {headers: headers})
    .pipe(map(response => {
      if(response){
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        
      }
      return response;
    }, error=>{
      return error;
    }));
  }

  isAuth(){
    return this.currentUser !=null;
  }

  register(user: User):Observable<any> {
    return this.httpClient.post<any>(API_URL+"user/registration", JSON.stringify(user),{headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }
  
  logout():Observable<any>{
    return this.httpClient.post(API_URL + "user/logout", {}).
    pipe(map(response =>{
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }))
  }

}
