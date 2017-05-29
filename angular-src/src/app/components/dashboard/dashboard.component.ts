import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  query: string;
  results: any;

  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  onAuthorize(){
    console.log('ala');
    this.authService.doAuth().subscribe(data =>{
      location.assign(data.link);
    });
  }

  search(){
    console.log(this.query);
    this.searchService.doSearch(this.query).subscribe(data =>{
      this.results = data;
      console.log(this.results);
    });
  }
}
