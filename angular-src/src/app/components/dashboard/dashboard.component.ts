import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';
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
  pageOffset: number;
  pagination_pages: Array<number>;

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router
  ) { 
    this.currentPage = 0;
    this.pageOffset =0;
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
        this.router.navigate(['']);
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
      if(this.currentPage <= 0 || param === 0){                     //New search
        this.currentPage=1;
      }
      else {  
         param === 1?this.currentPage++:this.currentPage--;//Next & previous button
         document.body.scrollTop = 0;  
       }
      this.search(this.currentPage);
    }

    /**
     * @description method for retrieving result of selected page
     * @param page page number to be searched
     */
    search(page: number){
      //console.log(page);
      document.body.scrollTop = 0;  
      this.currentPage = page;
      this.searchService.doSearch(this.query,page).subscribe(data =>{
          this.results = data.results;
          this.total_pages = data.total_pages;  //enhancment use
          if(this.total_pages >= 10){
            this.pagination_pages = new Array<number>(10);  
          }
          else{
            this.pagination_pages = new Array<number>(this.total_pages);
          }
          
      });
    }

    /**
    * @description sets page offset depeding on current page number
    */
    getPageOffset(){
      if(this.currentPage > 10){
        this.pageOffset = this.currentPage/10;
        this.currentPage%10 === 0?this.pageOffset=Math.trunc(this.pageOffset-1)*10:this.pageOffset=Math.trunc(this.pageOffset)*10;      
        return this.pageOffset;
      }
      else 
        return 0;
    }

    /**
     * @description skips the pages +10 ahead or -10back
     * @param param true for skip forward ,false for skip backward
     */
    skipPages(param: boolean){
      param?this.currentPage+=10:this.currentPage-=10;
      this.search(this.currentPage);
    }
    
}
