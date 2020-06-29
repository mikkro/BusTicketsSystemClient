import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { User } from './entity/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  currentUser: User;
  constructor(private router: Router, private authenticationService: AuthenticationService){
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      console.log(this.currentUser);
      if (route.data.roles && route.data.roles.indexOf(this.currentUser.role) === -1) {
        this.router.navigate(['']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
