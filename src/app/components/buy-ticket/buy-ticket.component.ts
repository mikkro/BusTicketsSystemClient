import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/entity/bus';
import { BusStop } from 'src/app/entity/bus-stop';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entity/user';
import { Seat } from 'src/app/entity/seat';
import { Ticket } from 'src/app/entity/ticket';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  
  currentUser:User;
  constructor(private activatedRoute:ActivatedRoute, private userService:UserService, private router:Router, private authenticationService:AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      data=>{
        if(data) this.currentUser = data
        else this.currentUser = new User();
      }
    );
    this.disabled = false;
  }
  disabled = false;
  origin:string;
  destination:string
  busId:string;
  bus:Bus = new Bus();
  busStops:BusStop[];
  selectedSeat:Seat = new Seat();
  seatNumber:number;
  errorMessage="";
  // user:User = new User();
  ticket:Ticket = new Ticket();


  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params=>{
      if(params.has('id')){
        this.busId=params.get('id');
        this.bus.id=+this.busId;
      }
      if(params.has('origin')){
        this.origin=params.get('origin');
      }
      if(params.has('arrival')){
        this.destination=params.get('arrival');
      }
    });
    this.userService.getBus(this.busId, this.origin, this.destination).subscribe(
      response=>{
        this.bus = response;
      }
    )
  }

  onSubmit(){


    this.ticket.user = this.currentUser;
    this.selectedSeat.bus = this.bus;
    this.ticket.seats.push(this.selectedSeat);
    this.ticket.origin = this.origin;
    this.ticket.destination = this.destination;
    this.ticket.price = this.bus.price;
    console.log(this.ticket);
    this.disabled = true;
    this.userService.buyTicket(this.ticket).subscribe(
      response=>{
        this.router.navigate(['confirm', response.ticketNumber]);
      },error=>{
        this.errorMessage= "Error!";
      }
    )

    //console.log(this.selectedSeat, this.origin, this.destination,this.bus.price, this.user);

  }
}
 