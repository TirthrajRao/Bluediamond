import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-forgot-pssword',
  templateUrl: './forgot-pssword.component.html',
  styleUrls: ['./forgot-pssword.component.css']
})
export class ForgotPsswordComponent implements OnInit {
  resetpswForm:FormGroup;
  emailHash;
  constructor( private route: ActivatedRoute,public _userService:UserService,private router: Router,) { 
    this.resetpswForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
    this.route.params.subscribe(param=>{
			this.emailHash = param.token;
		});
  }

  ngOnInit() {
  }

  forgotPassword(data){
    console.log("emailHash=============",this.emailHash)
    console.log('data================>',data);
    this._userService.forgotPassword(data.value,this.emailHash).subscribe(res=>{
      console.log('response of resetpsw============>',res);
      this.router.navigate(["/login"]);
    },err=>{
      console.log('err================>',err);
    })
  }

}
