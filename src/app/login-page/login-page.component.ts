import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  name: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  continue(): void {
    localStorage.setItem('username', this.name);
    this.router.navigate(['/search']);
  }

  cancel(): void {
    this.name = '';
  }
}
