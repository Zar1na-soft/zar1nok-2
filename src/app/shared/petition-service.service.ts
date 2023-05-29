// petition-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Petition } from './petitions';


@Injectable({
  providedIn: 'root'
})
export class PetitionService {
  constructor(private http: HttpClient) {}

  
}

