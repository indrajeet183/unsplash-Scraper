import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  baseuri: string;
  header: Headers;
  API_URI: string;

  constructor(private http: Http) { 
    this.baseuri = 'http://localhost:3000/users'
    this.header = new Headers();
    this.API_URI = 'https://api.unsplash.com';
  }

  doSearch(param,page){
    let params = new URLSearchParams();
    params.set('qry',param);
    params.set('page',page);
    return this.http.get(this.baseuri+'/search',{ search: params})
    .map(res => res.json());
  }

  getToken(param){
    let params = new URLSearchParams();
    params.set('qry',param);
    return this.http.get(this.baseuri+'/search',{ search: params})
    .map(res => res.json());
  }

  setToken(param){
    this.getToken(param).subscribe(data=>{

    })
  }

}
