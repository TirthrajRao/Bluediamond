import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetpswForm: FormGroup;
  submitted = false;
  isDisable = false;
  match = false
  constructor(public _userService: UserService) {

    this.resetpswForm = new FormGroup({
      email: new FormControl('', Validators.required),
      newPassword: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    });


  }

  ngOnInit() {
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
		}else{
			this.match = false;
		} 

	}

  resetPassword(data) {
    this.submitted = true;
		if (this.resetpswForm.invalid) {
			return;
    }
    this.isDisable = true;
    console.log('data===================>', data);
    this._userService.resetPassword(data.value).subscribe((res) => {
      console.log("response in reset pwd============>", res);
      this.isDisable = true;
    }, err => {
      console.log('err===============>', err);
      this.isDisable = true;
    })

  }
}
