import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('curruntUserToken'));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Register User
   * @param {object} userData 
   */
  registerUser(userData) {
    console.log("userData================>", userData);
    console.log(config.baseApiUrl)
    return this.http.post(config.baseApiUrl + "api/signup", userData);
  }

  /**
   * Login User
   * @param {object} userData 
   */
  login(userData) {
    console.log("userData================>", userData);
    return this.http.post(config.baseApiUrl + "api/login", userData)
      .pipe(map((user: any) => {
        console.log("login user=========>", user);
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('curruntUserToken', user.token);
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  /**
   * forgot Password sen Email
   * @param {object} data
   */
  forgotPasswordEmail(data) {
    console.log("userData================>", data);
    return this.http.post(config.baseApiUrl + "api/resetPassword", data);
  }

  /**
   * Forgot Password
   * @param {object} data
   * @param {String} emailHash
   */
  forgotPassword(data, emailHash) {
    console.log('data==============>', data, emailHash);
    return this.http.post(config.baseApiUrl + "api/email-verify/" + emailHash, data);
  }

  /**
   * Reset Password
   * @param {object} data
   */
  resetPassword(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('curruntUserToken')
      })
    };
    console.log('data==============>', data, localStorage.getItem('curruntUserToken'));
    return this.http.post(config.baseApiUrl + "api/updatePassword", data);
  }
  /**
   * Log Out
   */


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('curruntUserToken');
    this.currentUserSubject.next(null);
  }
}
