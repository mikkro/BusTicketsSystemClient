import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/entity/ticket';
import { User } from 'src/app/entity/user';
import { Seat } from 'src/app/entity/seat';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  reservationNumber:string;
  ticket:Ticket = new Ticket();
  ticketUser:User = new User();
  errorMessage = "";
  seats:Seat[] = [];
  constructor(private activatedRoute:ActivatedRoute, private userService:UserService, private adminService:AdminServiceService) {
  }

  ngOnInit() {
    this.reservationNumber = this.activatedRoute.snapshot.paramMap.get("reservationNumber");
    this.getConfirmation();
  }


  getConfirmation(){
    this.userService.getConfirmation(this.reservationNumber).subscribe(response=>{
      this.ticket = response;
      this.ticketUser = this.ticket.user;
      this.seats = this.ticket.seats;
    }, error=>{
      this.errorMessage = error;
    })
  }

}
