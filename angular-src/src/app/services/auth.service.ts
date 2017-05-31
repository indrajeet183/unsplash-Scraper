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
    .map(res => res.json());
  }

}
