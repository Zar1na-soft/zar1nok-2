import { Component, Input, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Petition } from 'src/app/shared/petitions';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import * as jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  petitions: Petition[];
  isAuthenticated: boolean = false;
  page: number =1;
  count: number =0;
  tableSize: number=3;
  tableSizes:any=[5,10,15,20];


  
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
  
      // Create Geocoder instance
      const geocoder = new google.maps.Geocoder();
  
      // Get address from latitude and longitude
      const latLng = { lat: 51.09555413778817, lng: 71.41688914019382 };
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results && results.length > 0) {
            const address = results[0].formatted_address;
            console.log(address);
            // Use the address as needed
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    });
  }

 

  fetchPetitions(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.http.get<any>('http://localhost:8080/petitions/open?page=0&size=10', { headers }).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          this.petitions = response.content.map((petition: Petition) => {
            petition.likedByThisUser = false;
            // Fetch latitude and longitude from backend (replace with actual property names)
            const latitude = petition.latitude;
            const longitude = petition.longitude;
            // Call method to convert latitude and longitude to address
            this.convertLatLngToAddress(petition, latitude, longitude);
            return petition;
          });
        } else {
          console.log('Invalid response format. Expected an array.');
        }
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }

  convertLatLngToAddress(petition: Petition, latitude: number, longitude: number): void {
    // Create Geocoder instance
    const geocoder = new google.maps.Geocoder();
  
    // Get address from latitude and longitude
    const latLng = { lat: latitude, lng: longitude };
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results && results.length > 0) {
          const address = results[0].formatted_address;
          petition.address = address; // Add address property to the Petition object
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }
  
  
  

  likePetition(petition: Petition){
    if(!this.isAuthenticated){
      return;
    }
    petition.likedByThisUser = !petition.likedByThisUser;
    const likeStatus = petition.likedByThisUser ? 'like' : 'unlike';
    const url = `http://localhost:8080/petitions/${likeStatus}?id=${petition.petitionId}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    

    this.http.patch(url, null, { headers }).subscribe(
      (response) => {
        if(likeStatus == 'like'){
          petition.likesNumber++;
          petition.likedByThisUser = true;
          console.log('yes');
        }
        else{
          petition.likesNumber--;
          petition.likedByThisUser = false; 
        }
      
  
      },
    );  
}


viewRequestDetails(petition: Petition) {
  this.router.navigate(['/open_request', petition.petitionId]);
}

onTableDataChange(event:any){
this.page = event;
this.fetchPetitions();
}
onTableSizeChange(event: any):void{
this.tableSize = event.target.value;
this.page = 1;
this.fetchPetitions();
}

}

//http://localhost:8080/petitions/like?id=19

//apiKey: 'AIzaSyAkcsuctaRniGDhVi-sTEkyHMrfUoSQQNM',