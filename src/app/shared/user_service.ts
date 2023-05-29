import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Petition } from './petitions';

export class UserService {

    items: Petition[];

    constructor(private http: HttpClient) { }
  
    // findOne(email: string): Observable<Petition> {
    //   return this.http.get('/api/users/' + email).pipe(
    //     map((user:Petition) =>user)
    //   )
    // }
}