import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Petition } from 'src/app/shared/petitions';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  petitions: Petition[];
  isAuthenticated: boolean = false;

  
  constructor(private router: Router, private http: HttpClient) { 
    this.isAuthenticated = !!localStorage.getItem('token');
   }

  title = 'google-maps';
  ngOnInit(): void {
    this.fetchPetitions();

    let loader = new Loader ({
      apiKey: 'AIzaSyAkcsuctaRniGDhVi-sTEkyHMrfUoSQQNM',
      libraries: ['places']
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 51.09555413778817, lng: 71.41688914019382 },
        zoom: 15,
      });

  
    });
  }

 

  fetchPetitions(): void{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });

    this.http.get<any>('http://localhost:8080/petitions/findAll?page=0&size=10',{headers}).subscribe((response: any)=>{
        this.petitions = response;
        
        console.log(response)
      },
      (error: any)=>{
        console.log('error');
      })
      
  }

  onSelect(request:any){
    this.router.navigate(['/main_page',request.id])
  }


}

//http://localhost:8080/petitions/like?id=19