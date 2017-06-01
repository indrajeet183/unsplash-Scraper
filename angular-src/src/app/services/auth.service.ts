import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {

  baseuri: string;                                //base uri for server

  constructor(private http: Http) { 
    this.baseuri = 'http://localhost:3000/users'
  }


/**
 * @description Method for Oauth login
 */
  doAuth(){
    return this.http.get(this.baseuri+'/oauth')
    .map(res => res.json()) ;
  }

/**
 * @description Method for logging out (removed item from localstorage)
 */
  logout(){
    localStorage.removeItem("loggedIn");
    console.log('ala');
    return this.http.get(this.baseuri+'/logout')
    .map(res => res.json());
  }


  /**
   * @description check if user is logged in or not by checking localstorage item
   */
  isLoggedIn(){
   let is: boolean;
    (localStorage.getItem("loggedIn") === "true" )?is = true:is = false;
    return is;
  }

}
