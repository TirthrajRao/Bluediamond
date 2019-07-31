import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {config} from '../config'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }

/**
 * Register User
 * @param {object} userData 
 */
  registerUser(userData){
    console.log("userData================>",userData);
    console.log(config.baseApiUrl)
    return this.http.post(config.baseApiUrl+"api/signup", userData);
  }

  /**
   * Login User
   * @param {object} userData 
   */
  login(userData){
    console.log("userData================>",userData);
    return this.http.post(config.baseApiUrl+"api/login", userData);
  }
  /**
   * forgot Password sen Email
   * @param {object} data
   */
  forgotPasswordEmail(data){
    console.log("userData================>",data);
    return this.http.post(config.baseApiUrl+"api/resetPassword", data);
  }

  /**
   * Forgot Password
   * @param {object} data
   * @param {String} emailHash
   */
  forgotPassword(data,emailHash){
    console.log('data==============>',data,emailHash);
    return this.http.post(config.baseApiUrl+"api/email-verify/" + emailHash , data);
  }

  /**
   * Reset Password
   * @param {object} data
   */
  resetPassword(data){
    const httpOptions = {
			headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'token': localStorage.getItem('curruntUserToken')
			})
		};
    console.log('data==============>',data, localStorage.getItem('curruntUserToken'));
    return this.http.post(config.baseApiUrl+"api/updatePassword", data);
  }
}
