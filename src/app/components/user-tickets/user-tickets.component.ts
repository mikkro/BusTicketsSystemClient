import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/entity/ticket';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent implements OnInit {

  dataSource = new MatTableDataSource<Ticket>();
  currentUser: User;
  displayedColumns = ['id', 'ticketNumber', 'origin', 'destination', 'price', 'seats', 'delete'];

  constructor(private userService:UserService, private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      data => this.currentUser = data
    );
  }

  ngOnInit(): void {
    this.getAllTickets();
  }

  getAllTickets() {
    console.log(this.currentUser.id);
      this.userService.getAllMyTickets(this.currentUser.id).subscribe(data=>{
        console.log(data);
        this.dataSource.data=data;
      })

  }

  seats(ticketNumber) {
    this.router.navigate(['confirm', ticketNumber]);
  }

  deleteTicket(id) {

  }

}
