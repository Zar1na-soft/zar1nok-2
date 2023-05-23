import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-ready-request',
  templateUrl: './ready-request.component.html',
  styleUrls: ['./ready-request.component.css']
})
export class ReadyRequestComponent implements OnInit{


  constructor() {}

  title = 'google-maps';
  ngOnInit(): void {

    let loader = new Loader ({
      apiKey: 'AIzaSyAkcsuctaRniGDhVi-sTEkyHMrfUoSQQNM',
      libraries: ['places']
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 51.09555413778817, lng: 71.41688914019382 },
        zoom: 15,
      });

      // const marker = new google.maps.Marker({
      //   position: { lat: 51.09555413778817, lng: 71.41688914019382 },
      //   map: map,
      //   draggable: true
      // });
      

      // const input = document.getElementById("searchbox") as HTMLInputElement;
      // const autocomplete = new google.maps.places.Autocomplete(input);
      // autocomplete.bindTo("bounds", map);

      // autocomplete.addListener("place_changed", () => {
      //   const place = autocomplete.getPlace();
      //   if (!place.geometry || !place.geometry.location) {
      //     window.alert("No details available for input: '" + place.name + "'");
      //     return;
      //   }

      //   marker.setPosition(place.geometry.location);
      //   map.setCenter(place.geometry.location);
      //   map.setZoom(15);
        
      // });
    });
  }


}
