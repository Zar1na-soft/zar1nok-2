import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { PetitionService } from 'src/app/shared/petition-service.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthservService } from 'src/app/shared/authserv.service';

interface Petition {
  // images: string[];
  // categoryName: string;
  // routeCode: string;
  // stationCode: string;
  description: string;
  // longitude: number | null;
  // latitude: number | null;
}

@Component({
  selector: 'app-createrequest',
  templateUrl: './createrequest.component.html',
  styleUrls: ['./createrequest.component.css']
})

export class CreaterequestComponent implements OnInit {
  
  petitionForm!: FormGroup;

  
constructor(private formBuilder: FormBuilder,private router: Router, private authService:AuthservService,  private http: HttpClient,){
  
}

buildForm(): void {
  this.petitionForm = this.formBuilder.group({
    images: [null],
    categoryName: [null],
    routeCode: [null],
    stationCode: [null],
    description: ['', Validators.required],
    longitude: [null],
    latitude: [null]
  });
}
title = 'google-maps';
ngOnInit(): void {
  this.buildForm();
  
  let loader = new Loader ({
    apiKey: 'AIzaSyAkcsuctaRniGDhVi-sTEkyHMrfUoSQQNM',
    libraries: ['places']
  });
  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 51.09555413778817, lng: 71.41688914019382 },
      zoom: 15,
    });

    const marker = new google.maps.Marker({
      position: { lat: 51.09555413778817, lng: 71.41688914019382 },
      map: map,
      draggable: true
    });
    

    const input = document.getElementById("searchbox") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      marker.setPosition(place.geometry.location);
      map.setCenter(place.geometry.location);
      map.setZoom(15);
      
    });
  });

}

save(){

  const bodyData: Petition = this.petitionForm.value;

  const formData = new FormData();
  // formData.append('categoryName', bodyData.categoryName);
  // formData.append('routeCode', bodyData.routeCode);
  // formData.append('stationCode', bodyData.stationCode);
  formData.append('description', bodyData.description);

  // if (bodyData.images && bodyData.images.length > 0) {
  //   for (let i = 0; i < bodyData.images.length; i++) {
  //     formData.append('images', bodyData.images[i]);
  //   }
  // }

const token = localStorage.getItem('token')
const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
console.log(token)
this.http.post("http://localhost:8080/petitions/create", formData, { headers, responseType: 'text' }).subscribe(
  (resultData: any) => {
    console.log(resultData);
    alert("User Registered Successfully");
  },
  (error: any) => {
    console.log(formData)
  }
);
console.log(bodyData)
 }








}
