import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Petition } from 'src/app/shared/petitions';

@Component({
  selector: 'app-openrequest',
  templateUrl: './openrequest.component.html',
  styleUrls: ['./openrequest.component.css']
})
export class OpenrequestComponent implements OnInit {
   public petitionId: number;
   petitions: Petition;
  constructor( private route: ActivatedRoute, private http: HttpClient) {}

  title = 'google-maps';
  ngOnInit(): void {
    this.petitionId = this.route.snapshot.params['id'];
    this.fetchPetition();
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

  fetchPetition(): void{
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });

    this.http.get<Petition>('http://localhost:8080/petitions/findAll?page=0&size=10/${this.petitionId}',{headers}).subscribe(
      (response: Petition) =>{
        this.petitions = response;
      },
      (error:any) =>{
        console.log('error');
      }
    )
  }
}
