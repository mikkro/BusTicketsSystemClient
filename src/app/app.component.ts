import { Component } from '@angular/core';
import { User } from './entity/user';
import { AuthenticationService } from './services/authentication.service';
import { Router, RoutesRecognized, NavigationEnd } from '@angular/router';
import { Role } from './entity/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BusTicketSystem';
  currentUser: User;
  isAdminPanel: boolean = false;

  constructor(private authenticationService:AuthenticationService, private router:Router){
    // this.authenticationService.currentUser.subscribe(data=>{
    //   this.currentUser = data;
    //   this.userChanged();
    //   // console.log(this.currentUser);
    //   // console.log(this.isAdminPanel);
    // })
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) { 
        this.userChanged();
        console.log(this.isAdminPanel);
      }
    });
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(data=>{
      this.currentUser = data;
      this.userChanged();
      // console.log(this.currentUser);
      // console.log(this.isAdminPanel);
    })

    

  }

  userChanged() {
    if(this.currentUser == null) {
      this.isAdminPanel = false;
      return;
    }
    if (!this.currentUser || Role.ADMIN !== this.currentUser.role) {
      this.isAdminPanel = false;
      return;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof RoutesRecognized) {
        var roles = evt.state.root.firstChild.data.roles;
        if (roles && roles.indexOf(this.currentUser.role) !== -1) {
          this.isAdminPanel = true;
        }else{
          this.isAdminPanel = false;
        }
      }
    });
  }
  
}
