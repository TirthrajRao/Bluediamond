import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
declare const $: any;

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
  submittedp = false;
  show = false;

  constructor(public _userService: UserService, public route: Router, public _alertService: AlertService) {

    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.forgotepasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })

    // redirect to home if already logged in
    if (this._userService.currentUserValue) {
      this.route.navigate(['/home']);
    }
  }

  ngOnInit() {
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
    });
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
      this._alertService.successAlert(res.message);
      // localStorage.setItem('curruntUserToken', res.token);
      this.route.navigate(['/home']);
      this.isDisable = false
    }, err => {
      console.log('err in login===============>', err);
      this._alertService.failurAlert(err.error.message);
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
    this._userService.forgotPasswordEmail(data.value).subscribe((res: any) => {
      console.log('response of password===============>', res);
      this._alertService.successAlert(res.message);
      $('#modalForgotPasswordForm').modal('hide');
      this.isDisable = false;
    }, err => {
      console.log('err in password===============>', err);
      this._alertService.failurAlert(err.error.message);
      this.isDisable = false;
    })
  }

  password() {
    this.show = !this.show;
  }
}
