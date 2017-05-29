import { Injectable } from '@angular/core';
import { Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  baseuri: string;

  constructor(private http: Http) { 
    this.baseuri = 'http://localhost:3000/users'
  }

  doSearch(param){
    let params = new URLSearchParams();
    params.set('qry',param);
    return this.http.get(this.baseuri+'/search',{ search: params})
    .map(res => res.json());
  }

}
