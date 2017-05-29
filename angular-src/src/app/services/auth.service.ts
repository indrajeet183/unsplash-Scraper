import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AuthService {

  baseuri: string;

  constructor(private http: Http) { 
    this.baseuri = 'http://localhost:3000/users'
  }

  doAuth(){
    return this.http.get(this.baseuri+'/oauth')
    .map(res => res.json());
  }

}
