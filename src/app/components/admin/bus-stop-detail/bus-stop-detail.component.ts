import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { BusStop } from 'src/app/entity/bus-stop';
import {formatDate} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/entity/bus';

formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss', 'en');


@Component({
  selector: 'app-bus-stop-detail',
  templateUrl: './bus-stop-detail.component.html',
  styleUrls: ['./bus-stop-detail.component.css']
})
export class BusStopDetailComponent implements OnInit {

  busStopForm: FormGroup;
  errorMessage="";
  selectedMoment = new Date();
  busStop:BusStop = new BusStop();
  bus:Bus = new Bus();
  busId:string;
  busStopId:string;
  constructor(private adminService:AdminServiceService, private activatedRoute:ActivatedRoute, private router:Router) {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.busId = params.get('id');
      }
      if(params.has('busStopId')){
        this.busStopId = params.get('busStopId');
      }
    })
   }

  ngOnInit() {
    this.busStopForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required]
      }),
      distance: new FormControl('', { validators: [Validators.required]})
    });
    if(this.busStopId !== null){
      this.adminService.getBusStop(this.busStopId).subscribe(data=>{
        console.log(data);
        this.busStop = data;
        this.selectedMoment = new Date(this.busStop.departureTime);
      })
    }
  }

  onSubmit(){
    this.busStop.name = this.busStopForm.value.name;
    this.busStop.distance = this.busStopForm.value.distance;
    let cValue = formatDate(this.selectedMoment, "yyyy-MM-dd'T'HH:mm:ss", 'en-US');
    // let cValue2 = this.selectedMoment.toISOString();
    console.log(cValue);
    this.busStop.departureTime = cValue;
    this.bus.id = +this.busId;
    this.busStop.bus = this.bus;
    this.adminService.addNewBusStop(this.busStop).subscribe(data=>{
      console.log(data);
      this.router.navigate(['busStops', this.busId]);
    });
    console.log(this.busStop);
  }

}
