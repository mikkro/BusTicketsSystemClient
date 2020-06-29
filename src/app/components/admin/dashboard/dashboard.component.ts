import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private adminService:AdminServiceService) { }
  numberOfGuests=0;
  numberOfAdmins=0;
  numberOfUsers=0;
  total=0;
  totalTickets=0;

  ngOnInit() {
    this.adminService.numberOfUsers().subscribe(data=>{
      this.numberOfGuests=data.GUEST;
      this.numberOfAdmins=data.ADMIN;
      this.numberOfUsers=data.USER;
      this.total = this.numberOfGuests +  this.numberOfAdmins +  this.numberOfUsers; 
    })
    this.adminService.getNumberOfTickets().subscribe(data=>{
      this.totalTickets = data
    });
  }



}
