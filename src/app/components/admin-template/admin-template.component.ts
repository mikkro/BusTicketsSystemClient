import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService:AuthenticationService, public router:Router) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(
      data=>{this.currentUser = data}
    );
  }

  logout(){
    this.authenticationService.logout().subscribe(data=>{
      this.router.navigate(['/']); 
      window.location.reload();
    })
  }

}
