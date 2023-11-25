import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, Inject } from '@angular/core';
import { GooglemapsService } from './googlemaps.service';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const {Geolocation} = Plugins;



declare var google: any;




@Component({
  selector: 'google-maps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent implements OnInit {


      // coordenadas DuocUc Viña
      @Input() position = {  
            lat: 0,
            lng: 0
      };

      
      map: any;
      marker: any;
      markerView: any;
      marker1: any;
      marker2: any;
      infowindow: any;
      positionSet: any;
      position1: any;
      position2: any;
      positionDuoc: any;
      beachFlagMarkerView: any;
      label: any;

      @ViewChild('map') divMap: ElementRef;


      constructor(private renderer: Renderer2,
                  @Inject(DOCUMENT) private document,
                  private googlemapsService: GooglemapsService,
                  public modalController: ModalController) { }

      ngOnInit(): void {
            this.init();
            console.log('position ->', this.position)
            this.mylocation();  
      }

      async init() {

            this.googlemapsService.init(this.renderer, this.document).then( () => {
                  this.initMap();
            }).catch( (err) => {    
                  console.log(err);
            });
            
      }

      
      initMap() {
            const position = this.position;
            this.positionDuoc = { lat: -33.033695220947266, lng: -71.53321075439453 };

            let latLng = new google.maps.LatLng(position.lat, position.lng);

            let mapOptions = {
                  center: latLng,
                  zoom: 15,
                  disableDefaultUI: false,
                  clickableIcons: false,
                  setClickableIcons: true,
            };
           
            this.map = new google.maps.Map(this.divMap.nativeElement, mapOptions);

            this.map.addListener('mapcapabilities_changed', () => {
                  const mapCapabilities = this.map.getMapCapabilities();
            });
            
            this.label = {
            titulo:'Estas Aquí',
            subtitulo: 'Desubicado'
      } 

            this.marker = new google.maps.Marker({
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  draggable: false,
                  panTo: latLng,
                  icon: {
                        url: 'assets/icon/Marker1.png'

                        }
            });
            
            this.infowindow = new google.maps.InfoWindow();
            
            this.addMarker(this.position);
            this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo);
            
            this.markerView = new google.maps.Marker({
                  map:this.map,
                  position: this.positionDuoc,
                  icon: {
                        url: 'assets/icon/marker5.png'

                        }

            })
            this.addMarkers(this.positionDuoc)
            //this.clickHandleEvent(this.markerView)
            
            // Jardin Botanico -33.048674782518226, -71.49779906163025
            this.position1 = {
                  lat: -33.048674782518226,
                  lng: -71.49779906163025
            };
            
            this.marker1 = new google.maps.Marker({
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  draggable: false,
                  position: this.position1,
                  icon: {
                        url: 'assets/icon/marker5.png'

                        }
                
            })
            this.addMarkers(this.position1)
            //this.clickHandleEvent(this.marker1)
             
            //Cerro Alegre Valparaiso -33.043806258896325, -71.62657360068589 
            this.position2 = {
                  lat: -33.043806258896325,
                  lng: -71.62657360068589
            };
            
            this.marker2 = new google.maps.Marker({
                  map: this.map,
                  animation: google.maps.Animation.DROP,
                  draggable: false,
                  position: this.position2,
                  icon: {
                        url: 'assets/icon/marker5.png'

                        }
            });
            this.addMarkers(this.position2)
            //this.clickHandleEvent(this.marker2)
      }
      
      /*clickHandleEvent(mark: any) {

            this.marker1.addListener('click', ({ domEvent, latLng }) => {
                  const { target } = domEvent;
                  this.setInfoWindow(mark, this.label.titulo, this.label.subtitulo)  
            });

      }*/
      
      addMarker(position: any): void {

            let latLng = new google.maps.LatLng(position.lat, position.lng);

            this.marker.setPosition(latLng);
            this.map.panTo(position);
            this.positionSet = position;

      }
      addMarkers(position: any): void {

            if(position == this.position1){

                  let latLng = new google.maps.LatLng(position.lat, position.lng);
                  this.marker1.setPosition(latLng);
                  this.positionSet = position;
            
            }else if (position == this.position2) {
                  let latLng = new google.maps.LatLng(position.lat, position.lng)
                  this.marker2.setPosition(latLng);
                  this.positionSet = position;
           
            }else if (position == this.positionDuoc) {
                  let latLng = new google.maps.LatLng(position.lat, position.lng)
                  this.markerView.setPosition(latLng);
                  this.positionSet = position;

            }else{
                  console.log('error en esta wea ')
            }
            

      }
      setInfoWindow(marker: any, titulo: string, subtitulo: string) {

            const contentString  =  '<div id="contentInsideMap">' +
                                    '<div>' +
                                    '</div>' +
                                    '<p style="font-weight: bold; margin-bottom: 5px;">' + titulo + '</p>' +
                                    '<div id="bodyContent">' +
                                    '<p class"normal m-0">'
                                    + subtitulo + '</p>' +
                                    '</div>' +
                                    '</div>';
            this.infowindow.close();
            this.infowindow.setContent(contentString);
            this.infowindow.open(marker.map, marker);


      }
      
      
      async mylocation() {
            console.log('mylocation() click');
        
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
        
                console.log('mylocation() -> get ', position);
        
                const markerPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                this.addMarker(markerPosition);
                this.map.myLocationEnabled = true;
            } catch (error) {
                console.error('Error getting current position:', error);
            }
        }
        

      

      aceptar() {
            console.log('click aceptar -> ', this.positionSet);
            this.modalController.dismiss({pos: this.positionSet})
      }

}