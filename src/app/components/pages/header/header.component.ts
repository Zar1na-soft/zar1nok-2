import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated: boolean;

  constructor( private router: Router,) {
    this.isAuthenticated = !!localStorage.getItem('token');
  }

   
  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']).then(() => {
      window.location.reload(); // Refresh the page after navigation
    });
    console.log("fire")
  }
}
