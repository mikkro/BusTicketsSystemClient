import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Seat } from 'src/app/entity/seat';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/entity/bus';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-seat-detail',
  templateUrl: './seat-detail.component.html',
  styleUrls: ['./seat-detail.component.css']
})
export class SeatDetailComponent implements OnInit {

  seatForm: FormGroup;
  seat: Seat = new Seat();
  errorMessage = "";
  id="";
  bus:Bus = new Bus();
  constructor(private activatedRoute:ActivatedRoute, private adminService:AdminServiceService, private router:Router) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
      }
    })
    this.seatForm = new FormGroup({
      seatNumber: new FormControl('', {
        validators: [Validators.required]
      }),
      avaiable: new FormControl('', { validators: [Validators.required, Validators.min(100), Validators.minLength(3)] }),
    });
  }

  onSubmit() {
    this.seat.number = this.seatForm.value.seatNumber;
    this.seat.avaiable = this.seatForm.value.avaiable;
    this.bus.id = +this.id;
    this.seat.bus = this.bus;
    console.log(this.seat);
    this.adminService.addNewSeat(this.seat).subscribe(response=>{
      this.router.navigate(['bus', this.id]);
    })
  }

}
