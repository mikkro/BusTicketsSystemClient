import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/entity/bus';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/entity/ticket';
import { Seat } from 'src/app/entity/seat';

@Component({
  selector: 'app-bus-detail',
  templateUrl: './bus-detail.component.html',
  styleUrls: ['./bus-detail.component.css']
})
export class BusDetailComponent implements OnInit {

  constructor(private adminService:AdminServiceService, private activatedRoute:ActivatedRoute, private router:Router) { }
  id:string;
  dataSource = new MatTableDataSource<Seat>();
  displayedColumns = ['id', 'number', 'avaiable', 'ticket'];
  seatList:Seat[] = [];
  bus:Bus;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
      }
    })
    this.getBusDetails();
  }
  
  getBusDetails() {
    this.adminService.getBusDetails(this.id).subscribe(data=>{
      console.log(data);
      this.bus = data;
      this.dataSource.data = data.seats;
    })
  }

  addSeat(){
    this.router.navigate(['seat', this.id]);
  }

  

}
