import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
declare const $ : any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpswForm: FormGroup;
  submitted = false;
  isDisable = false;
  match = false;
  show = false;
  show1 = false;
  constructor(public _userService: UserService,public _alertService: AlertService) {

    this.resetpswForm = new FormGroup({
      email: new FormControl('', Validators.required),
      oldPassword: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      newPassword: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    });


  }

  ngOnInit() {
    $(".toggle-password").click(function() {
      $(this).toggleClass("fa-eye fa-eye-slash");
    });
  }

  get resetPswValidation() {
    return this.resetpswForm.controls;
  }
  
/**
 * Compare password
 * @param form 
 */
  comparePassword(form){
		console.log(form.value.newPassword == form.value.confirmPassword, this.match);
		if(form.value.newPassword === form.value.confirmPassword){
			console.log("In true condition");
      this.match = true;
      $('#confirmPassword').css('border-color','green')
		}else{
      this.match = false;
      $('#confirmPassword').css('border-color','red')
		} 
	}

  /**
   * Reset Password 
   * @param {object} data 
   */
  resetPassword(data) {
    this.submitted = true;
		if (this.resetpswForm.invalid) {
			return;
    }
    this.isDisable = true;
    console.log('data===================>', data);
    this._userService.resetPassword(data.value).subscribe((res:any) => {
      console.log("response in reset pwd============>", res);
      this._alertService.successAlert(res.message)
      this.isDisable = false;
      this.resetpswForm.reset();
    }, err => {
      console.log('err===============>', err);
      this._alertService.failurAlert(err.error.message);
      this.isDisable = false;
      this.resetpswForm.reset();
    })
  }
  npassword(){
    this.show= !this.show;
  }
  cpassword(){
    this.show1= !this.show1;
  }
}
