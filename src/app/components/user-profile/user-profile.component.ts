import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Petition } from 'src/app/shared/petitions';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  petitions: Petition[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = 'http://localhost:8080/petitions/profile?page=0&size=10';

    this.http.get<any>(url, { headers }).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          this.petitions = response.content.map((petition: Petition) => {
            return petition;
          })
        }
      },
      (error: any) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }
}
