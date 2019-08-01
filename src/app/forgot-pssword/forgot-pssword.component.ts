import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-forgot-pssword',
  templateUrl: './forgot-pssword.component.html',
  styleUrls: ['./forgot-pssword.component.css']
})
export class ForgotPsswordComponent implements OnInit {
  resetpswForm: FormGroup;
  emailHash;
  isDisable = false;
  isSubmitted = false;
  submitted = false;

  constructor(private route: ActivatedRoute, public _userService: UserService, private router: Router, ) {
    this.resetpswForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    })
    this.route.params.subscribe(param => {
      this.emailHash = param.token;
    });
  }

  ngOnInit() {
  }

  get forgotPswValdition() {
    return this.resetpswForm.controls;
  }

  /**
   * Email Validation
   * @param {object} form 
   */
  validateEmail(form) {
    console.log(form);
    const emailregx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const message = document.getElementById('message');
    if (!form.email.match(emailregx)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter Valid Email"
    } else {
      message.innerHTML = "";
    }
  }

  /**
   * Forgot Password
   * @param {Object} data 
   */
  forgotPassword(data) {
    console.log("emailHash=============", this.emailHash)
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetpswForm.invalid) {
      return;
    }
    this.isDisable = true
    console.log('data================>', data);
    this._userService.forgotPassword(data.value, this.emailHash).subscribe(res => {
      console.log('response of resetpsw============>', res);
      this.isDisable = false
      this.router.navigate(["/login"]);
    }, err => {
      console.log('err================>', err);
      this.isDisable = false
    })
  }

}
