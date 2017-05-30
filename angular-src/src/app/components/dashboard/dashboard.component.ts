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

  query: string;
  results: any;
  total_pages:number;
  currentPage: number;

  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) { 
    this.currentPage = 0;
  }

  ngOnInit() {
  }

  onAuthorize(){
    console.log('ala');
    this.authService.doAuth().subscribe(data =>{
      location.assign(data.link);
    });
  }

  // search(){
  //   console.log(this.query);
  //   this.searchService.doSearch(this.query).subscribe(data =>{
  //     this.results = data.results;
  //     this.total_pages = data.total_pages;
  //     console.log(data);
  //   });
  // }

    search(param: number){
      param?this.currentPage+=1:this.currentPage-=1;
      if(this.currentPage <= 0) this.currentPage = 1;
      console.log(this.query);
      this.searchService.doSearch(this.query,this.currentPage).subscribe(data =>{
        this.results = data.results;
        this.total_pages = data.total_pages;
        console.log(data);
        document.body.scrollTop = 0;
      });
    }
}
