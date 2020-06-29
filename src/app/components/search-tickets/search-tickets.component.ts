import { Component, OnInit, ViewChild } from '@angular/core';
import { BusStop } from 'src/app/entity/bus-stop';
import {UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, NgForm, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BusQuery } from 'src/app/entity/bus-query';
import { Router } from '@angular/router';
import { Bus } from 'src/app/entity/bus';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
@Component({
  selector: 'app-search-tickets',
  templateUrl: './search-tickets.component.html',
  styleUrls: ['./search-tickets.component.css']
})
export class SearchTicketsComponent implements OnInit {

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) { }
  busForm: FormGroup;
  // busStops:BusStop[]= [];
  busStops: String[] = []
  countryControl = new FormControl();
  // departureBusStop = null;
  //arrivalBusStop = null;
  busQuery: BusQuery = new BusQuery();
  selectedValue: string;
  selectedValue2: string;
  selectedBus: Bus = new Bus();
  isSubmited = false;
  errorMessage ="";
  displayedColumns = ['number', 'originDeparture', 'originName', 'arrivalDeparture', 'arrivalName', 'price', 'select'];
  dataSource = new MatTableDataSource<Bus>();
  datePicker = new FormControl(new Date());


  @ViewChild(MatSort) sort: MatSort;
  // selectedBus: Subject<Bus> = new Subject<Bus>();
  // private selectedBus: BehaviorSubject<Bus>;


  ngOnInit() {
    this.findAllBusStops();
  }

  isCorrect(){
    // return (this.selectedValue != this.selectedValue2 && this.busStops.indexOf(this.selectedValue)<this.busStops.indexOf(this.selectedValue2));
    return (this.selectedValue != this.selectedValue2);


  }

  onSubmit() {
    this.selectedValue = this.busQuery.origin;
    this.selectedValue2 = this.busQuery.arrival;
    if (this.isCorrect()) {
      this.errorMessage ="";
      // console.log(this.busQuery.origin);
      this.userService.getRoute(this.busQuery).subscribe(
        response => {
          // console.log(response);
          this.isSubmited = true;
          this.dataSource.data = response;
          console.log(this.dataSource.data)
        }, error => {
          console.log(error);
        }
      );
    }else{
      this.errorMessage ="Uncorrect selection! Try again!";
    }
  }

  selectBus(id) {
    this.router.navigate(['/buyTicket', id, this.selectedValue, this.selectedValue2]);
  }



  findAllBusStops() {
    this.userService.getBusStops().subscribe(response => {
      this.busStops = response;
    });
  }

}
