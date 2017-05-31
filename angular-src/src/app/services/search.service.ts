import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  baseuri: string;        //base uri for server
  API_URI: string;        //API url of unsplash

  constructor(private http: Http) {               //initialization of variables
    this.baseuri = 'http://localhost:3000/users'
    this.API_URI = 'https://api.unsplash.com';
  }


/**
 * @desc method for fetching the result of based on paramter 
 * @param param query parameter for querying the search
 * @param page  page number which is to retreived
 */

  doSearch(param,page){
    let params = new URLSearchParams();
    params.set('qry',param);
    params.set('page',page.toString());
    return this.http.get(this.baseuri+'/search',{ search: params})
    .map(res => res.json());
  }

}
