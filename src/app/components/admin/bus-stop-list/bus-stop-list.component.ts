import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Seat } from 'src/app/entity/seat';
import { Bus } from 'src/app/entity/bus';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bus-stop-list',
  templateUrl: './bus-stop-list.component.html',
  styleUrls: ['./bus-stop-list.component.css']
})
export class BusStopListComponent implements OnInit {
  id:string;
  dataSource = new MatTableDataSource<Seat>();
  displayedColumns = ['id', 'name', 'distance', 'departureTime', 'select'];
  seatList:Seat[] = [];
  bus:Bus;
  constructor(private adminService:AdminServiceService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
      }
    })
    this.getBusStops();
  }
  
  getBusStops() {
    this.adminService.getBusStops(this.id).subscribe(data=>{
      console.log(data);
      this.dataSource = data;
    })
  }

  select(busStopId){
    this.router.navigate(['bus-stop', this.id, busStopId]);
  }

  addNewBusStop(){
      this.router.navigate(['bus-stop', this.id]);
  }

}
