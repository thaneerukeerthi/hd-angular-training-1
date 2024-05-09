import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  apiUrl: string = 'http://universities.hipolabs.com/search'; 

  constructor(private http: HttpClient) { }

  getUniversities(country: string) {
    return this.http.get(`${this.apiUrl}?country=${country}`);
  }
}
