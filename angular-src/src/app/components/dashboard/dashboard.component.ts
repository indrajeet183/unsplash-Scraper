import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  query: string;              //search box text query
  results: any;               //result of successful search
  total_pages:number;         //total pages avilable for search query
  currentPage: number;        //current page number

  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) { 
    this.currentPage = 0;
  }

  ngOnInit() {
   
  }

 /**
   * @description Method for Oauth login after success it will redirect the auth_url
   */
  onAuthorize(){
    this.authService.doAuth().subscribe(data =>{
      if(data.success){
        location.assign(data.link);
      }
      else{
        console.log('Error');
      }
    });
  }

  /**
   * @description Method for retreving data by page number and with same query parameter
   * @param boolean for chekcing if button is previous or next 
   */
    searchPage(param: boolean){
      console.log(param);
      console.log(this.currentPage);
      if(this.currentPage <= 0){                     //New search
        this.currentPage++;
      }
       else {
         param?this.currentPage++:this.currentPage--;//Next & previous button
         document.body.scrollTop = 0;  
       }
      console.log(this.currentPage);
      this.searchService.doSearch(this.query,this.currentPage).subscribe(data =>{
          this.results = data.results;
          //this.total_pages = data.total_pages;  //enhancment use
          console.log(this.results);     
      });
      console.log(this.currentPage);
    }
}
