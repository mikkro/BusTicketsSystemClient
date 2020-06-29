import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { User } from 'src/app/entity/user';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/entity/ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html',
  styleUrls: ['./bus-list.component.css']
})
export class BusListComponent implements OnInit {

  dataSource = new MatTableDataSource<Ticket>();
  currentUser: User;
  displayedColumns = ['id', 'number', 'seats', 'busStops'];

  constructor(private adminService:AdminServiceService, private router:Router) { }

  ngOnInit() {
    this.getAllBusses();
  }
  
  getAllBusses() {
    return this.adminService.getAllBusses().subscribe(data=>{
      this.dataSource = data;
    })
  }

  seats(id){
    this.router.navigate(['bus', id]);
  }

  busStops(id){
    this.router.navigate(['busStops', id]);
  }

  addBus(){
    this.router.navigate(['new-bus']);
  }


}
