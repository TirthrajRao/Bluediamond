import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotepasswordForm: FormGroup;
  submitted = false;
  isDisable = false;
  submittedp = false
  constructor(public _userService: UserService, public route: Router) {

    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.forgotepasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  ngOnInit() {
  }

  get loginValidation() {
    return this.loginForm.controls;
  }

  get forgotPswValidation() {
    return this.forgotepasswordForm.controls;
  }

  /**
   * Login User
   * @param data 
   */
  loginUser(data) {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.isDisable = true;
    console.log('loginuserdata===============>', data, this.isDisable)
    this._userService.login(data.value).subscribe((res: any) => {
      console.log('response of login===============>', res);
      localStorage.setItem('curruntUserToken', res.token);
      this.route.navigate(['/home']);
      this.isDisable = false
    }, err => {
      console.log('err in login===============>', err)
      this.isDisable = false
    })
  }

  /**
   * Send Email Forgot Password
   * @param {object} data
   */
  forgotPassword(data) {
    console.log("data==============>", data);
    this.submittedp = true;
    // stop here if form is invalid
    if (this.forgotepasswordForm.invalid) {
      return;
    }
    this.isDisable = true;
    this._userService.forgotPasswordEmail(data.value).subscribe((res) => {
      console.log('response of password===============>', res);
      $('#modalForgotPasswordForm').modal('hide');
      this.isDisable = false;
    }, err => {
      console.log('err in password===============>', err);
      this.isDisable = false;
    })
  }
}
