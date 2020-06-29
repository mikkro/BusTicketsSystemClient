import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/entity/user';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  dataSource = new MatTableDataSource<User>();
  displayedColumns = ['number', 'username', 'firstName', 'lastName', 'email', 'role', 'select', 'delete'];

  constructor(private adminService:AdminServiceService, private router:Router) { }



  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe(data=>{
      this.dataSource = data;
    })
  }

  selectUser(id){
    this.router.navigate(['user-detail', id]);
  }
  
  deleteUser(id){
    this.adminService.deleteUser(id).subscribe(data=>{
      console.log(data);
      this.getUsers();
    },error=>{
      console.log(error);
    })
  }

}
