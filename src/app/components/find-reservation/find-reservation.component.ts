import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-find-reservation',
  templateUrl: './find-reservation.component.html',
  styleUrls: ['./find-reservation.component.css']
})
export class FindReservationComponent implements OnInit {

  errorMessage="";
  reservationForm:FormGroup;
  
  constructor(private router:Router, private userService:UserService) { }

  ngOnInit() {
    this.reservationForm = new FormGroup({
      reservationNumber: new FormControl('', {
        validators: [Validators.required]
      }),
    });
  }

  onSubmit(){
    this.getConfirmation();
    // console.log(this.reservationForm.value.reservationNumber);
    // this.router.navigate(['confirm', this.reservationForm.value.reservationNumber]);
  }

  getConfirmation(){
    this.userService.getConfirmation(this.reservationForm.value.reservationNumber).subscribe(response=>{
      this.router.navigate(['confirm', this.reservationForm.value.reservationNumber]);
    }, error=>{
      this.errorMessage = "Reservation not found!";
    })
  }
}
