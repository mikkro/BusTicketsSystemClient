import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bus } from 'src/app/entity/bus';

@Component({
  selector: 'app-new-bus',
  templateUrl: './new-bus.component.html',
  styleUrls: ['./new-bus.component.css']
})
export class NewBusComponent implements OnInit {

  errorMessage="";
  busForm: FormGroup;
  bus:Bus;

  constructor(private adminService: AdminServiceService, private router: Router) {
    this.bus = new Bus();
  }

  ngOnInit(): void {
    this.busForm = new FormGroup({
      busNumber: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit(){
    console.log("Click");
    this.bus.number = this.busForm.value.busNumber;
    this.adminService.addNewBus(this.bus).subscribe(data=>{
      console.log(data);
      this.router.navigate(['bus-list']);
    }, error=>{
      this.errorMessage = "Wrong bus number";
    });
  }

}
