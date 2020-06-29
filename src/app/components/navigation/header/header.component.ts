import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { Role } from 'src/app/entity/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth=false;
  currentUser: User;
  constructor(private authenticationService:AuthenticationService, private router:Router ) { 
    this.authenticationService.currentUser.subscribe(
      data=>{this.currentUser = data}
    );
  }

  ngOnInit() {
    // this.authSubscription = this.authenticationService.authChange.subscribe(authStatus=>{
    //   this.isAuth = authStatus;
    //   // console.log(this.isAuth);
    // });
  }


  onToggleSideNav(){}
  
  onLogout(){
    this.authenticationService.logout().subscribe(data=>{
      this.isAuth = false;
      this.router.navigate(['/welcome']); 
    })
  }

  get isAdmin(){
    return this.currentUser && this.currentUser.role === Role.ADMIN;
  }

}
