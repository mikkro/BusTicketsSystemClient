import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entity/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user:User = new User();
  errorMessage:string;
  signupForm:FormGroup;

  constructor(private auth:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', { validators: [Validators.required] }),
      firstName: new FormControl('', { validators: [Validators.required] }),
      lastName: new FormControl('', { validators: [Validators.required] }),
      email: new FormControl('', { validators: [Validators.required] })
    });
  }

  register(){
    this.auth.register(this.user).subscribe(
      data =>{
        this.router.navigate(['/login']);
      }, error=>{
        this.errorMessage = "username is already exist."
      }
    )
  }

  onSubmit(){
    this.user.username = this.signupForm.value.username;
    this.user.password = this.signupForm.value.password;
    this.user.firstName = this.signupForm.value.firstName;
    this.user.lastName = this.signupForm.value.lastName;
    this.user.email = this.signupForm.value.email;


    this.auth.register(this.user).subscribe(
      data =>{
        this.router.navigate(['/login']);
      }, error=>{
        this.errorMessage = "username is already exist."
      }
    )
  }

  
}
