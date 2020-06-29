import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/entity/ticket';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/entity/user';
import { Role } from 'src/app/entity/role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  dataSource = new MatTableDataSource<Ticket>();
  currentUser: User;
  displayedColumns = ['id', 'ticketNumber', 'origin', 'destination', 'price', 'seats', 'delete'];

  constructor(private adminService: AdminServiceService, private router: Router, private authenticationService: AuthenticationService, private userService:UserService) {
    this.authenticationService.currentUser.subscribe(
      data => { this.currentUser = data }
    );
  }

  ngOnInit(): void {
    this.getAllTickets();
  }

  getAllTickets() {
  
      this.adminService.getAllTickets().subscribe(data=>{
        this.dataSource.data=data;
      })

  }

  seats(ticketNumber) {
    this.router.navigate(['confirmation', ticketNumber]);
  }

  deleteTicket(id) {
  }

}
