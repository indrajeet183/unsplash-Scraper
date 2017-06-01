import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';

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
        localStorage.setItem("loggedIn","true");
      }
      else{
        console.log('Error');
      }
    });
  }

  /**
   * @description Method for logging out scraper(still underconstruction)
   */
  onLogout(){
    this.authService.logout().subscribe(data =>{
      if(data.success == true)  
        this.results = null;
    });
    
  }

  /**
   * @description To check if logged in or not
   */
  loggedIn(){
     return this.authService.isLoggedIn();
  }
  /**
   * @description Method for retreving data by page number and with same query parameter
   * @param boolean for chekcing if button is previous or next 
   */
    searchPage(param: number){
      console.log(param);
      console.log(this.currentPage);
      if(this.currentPage <= 0 || param === 0){                     //New search
        this.currentPage=1;
      }
      else {  
         param === 1?this.currentPage++:this.currentPage--;//Next & previous button
         document.body.scrollTop = 0;  
       }
      console.log(this.currentPage);
      this.search(this.currentPage);
      console.log(this.currentPage);
    }

    /**
     * @description method for retrieving result of selected page
     * @param page page number to be searched
     */
    search(page: number){
      document.body.scrollTop = 0;  
      this.currentPage = page;
      this.searchService.doSearch(this.query,page).subscribe(data =>{
          this.results = data.results;
          this.total_pages = data.total_pages;  //enhancment use
          console.log(this.results);    
          console.log(this.total_pages); 
      });
    }
    
}
