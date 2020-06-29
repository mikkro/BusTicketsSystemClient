import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User = new User();
  errorMessage = "";
  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.user.username = this.loginForm.value.username;
    this.user.password = this.loginForm.value.password;
    this.authentication.login(this.user).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['home']);
      }, err => {
        this.errorMessage = "Username or password is incorrect.";
      });
  }
}
