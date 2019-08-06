import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser:any;

  constructor(public route:Router,
    private _userService: UserService) {
      this._userService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logOut(){
   	this._userService.logout();
    this.route.navigate(['/login'])
  }
}
