import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Petition } from './petitions';

@Injectable({
  providedIn: 'root'
})
export class PetitionService {
  
  private apiUrl = 'http://localhost:8080/petitions/create';

  constructor(private http: HttpClient) { }
  createPetition(petition: Petition): Observable<any> {
    return this.http.post(this.apiUrl, petition);
  }
}
