import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityService } from '../university.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  username: string = '';
  countries: string[] = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India'];
  selectedCountry: string = '';
  otherCountry: string = '';
  searchCount: number = 0;
  universities: any[] = [];

  constructor(private router: Router, private universityService: UniversityService) { }

  ngOnInit(): void {
    if (localStorage) {
      this.username = localStorage.getItem('username') || '';
      
    } else {
      this.username = '';
    }
  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  search(): void {
    let country = this.otherCountry ? this.otherCountry : this.selectedCountry;
    this.universityService.getUniversities(country)
      .subscribe((data: any) => {
        this.universities = data.map((university: { [x: string]: any; name: any; web_pages: any; }) => ({
          name: university.name,
          stateProvince: university['state-province'],
          webpages: university.web_pages
        }));
        this.searchCount++;
        localStorage.setItem('searchCount', this.searchCount.toString());
      });
  }
}
