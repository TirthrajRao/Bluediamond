import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  isDisable = false;

  constructor(public router: Router, public _userService: UserService) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    });
  }

  ngOnInit() {
  }
  get rgisterFormValidation() {
    return this.registerForm.controls;
  }

  validateEmail(form)
		{
			console.log(form);
			const emailregx =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
			const message = document.getElementById('message');
			if(!form.email.match(emailregx)){
				console.log("message==========",message)
				message.innerHTML = "Please enter Valid Email"
			}else{
				message.innerHTML = "";
			}
    }
    

		validateFirstName(form)
		{
			console.log(form);
			const nameInput =  /^[a-zA-Z ]+$/ ;
			const message1 = document.getElementById('message1');
			if(!form.firstName.match(nameInput)){
				console.log("message==========",message1)
				message1.innerHTML = "Firstname can not Contain digit"
			}else{
				message1.innerHTML = "";
			}
    }

    validateLastName(form)
		{
			console.log(form);
			const nameInput = /^[a-zA-Z ]+$/ ;
			const message2 = document.getElementById('message2');
			if(!form.lastName.match(nameInput)){
				console.log("message==========",message2)
				message2.innerHTML = "Lastame can not Contain digit"
			}else{
				message2.innerHTML = "";
			}
    }

    
  /**
   * Register User
   * @param data 
   */
  registerUser(data) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.isDisable = true
    console.log("=========registeruser==========", data)
    this._userService.registerUser(data.value).subscribe((res) => {
      console.log('response of add user==============>', res);
      this.isDisable = false;
      this.router.navigate(['/login']);
    }, err => {
      console.log('err of add user==============>', err);
      this.isDisable = false
    })
  }

}
