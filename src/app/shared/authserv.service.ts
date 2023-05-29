import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthservService  {
  private authTokenKey = 'authToken';
  constructor(private http: HttpClient) { 
    
  }

  setAuthToken(token: string): void {
    // Store the authentication token in local storage or session storage
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    // Retrieve the authentication token from local storage or session storage
    return localStorage.getItem(this.authTokenKey);
  }

  savePetition(data:any){
    return this.http.post('http://localhost:8080/petitions/create',data)
  }

  getCurrentEmail(){
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: { sub: string } = jwt_decode.default(token) as { sub: string };
      const userId: string = decodedToken.sub;
      console.log(userId)
    } 
  }
}
