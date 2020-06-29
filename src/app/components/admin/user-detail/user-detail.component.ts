import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { User } from 'src/app/entity/user';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/entity/ticket';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User = new User();
  dataSource = new MatTableDataSource<Ticket>();
  displayedColumns = ['reservationNumber', 'origin', 'destination', 'price']
  ticketList:Ticket[] = [];
  id: string;
  constructor(private adminService: AdminServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
      }
    })
    this.adminService.getUserById(this.id).subscribe(data=>{
      this.user = data;
      this.dataSource.data = data.tickets;
      console.log(data);
    });
  
  }



}
