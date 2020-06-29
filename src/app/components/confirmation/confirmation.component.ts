import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/entity/ticket';
import { User } from 'src/app/entity/user';
import { Seat } from 'src/app/entity/seat';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  reservationNumber:string;
  ticket:Ticket = new Ticket();
  ticketUser:User = new User();
  errorMessage = "";
  seats:Seat[] = [];
  constructor(private activatedRoute:ActivatedRoute, private userService:UserService) {
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
