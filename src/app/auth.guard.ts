import { Injectable } from '@angular/core';
import { Router,ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from './services/user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private _userService: UserService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUser = this._userService.currentUserValue;
    console.log(currentUser);
    if (currentUser) {
      console.log("currunt user============>",currentUser)
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
    // throw new Error("Method not implemented.");
  }
  
}
