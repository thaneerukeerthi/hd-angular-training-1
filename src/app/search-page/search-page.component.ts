import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UniversityService } from '../university.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  username: string = '';
  countries: string[] = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'India'];
  selectedCountry: string = '';
  otherCountry: string = '';
  searchCount: number = 0;
  universities: any[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'stateProvince', 'webpages']
  currentPage: number =0;

  constructor(private router: Router, private universityService: UniversityService) { }

  ngOnInit(): void {
    if (localStorage) {
      this.username = localStorage.getItem('username') || '';
    } else {
      this.username = '';
    }
    this.dataSource = new MatTableDataSource<any>();
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
        this.dataSource.data = this.universities;
        this.totalItems = this.universities.length;
        console.log("items",this.totalItems, this.universities)
        this.dataSource.paginator = this.paginator;
        this.searchCount++;
        localStorage.setItem('searchCount', this.searchCount.toString());
        this.paginator.firstPage();
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
