import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular'
import { UserProvider } from '../../providers/user/user';;
import { last } from 'rxjs/operator/last';
import { ClinicaProvider } from '../../providers/clinica/clinica';
import { ExportProvider } from '../../providers/export/export';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef; //Endereço da div HTML
  
  
  map; // Objeto Mapa do Google

  clinicasArr = [];

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public clinicaProvider: ClinicaProvider,
    public exportProvider: ExportProvider,
    
    ) {

  }

  ionViewDidLoad() {
    
    this.map = this.createMap(this.mapElement);

    this.clinicaProvider.listarFS().subscribe(_data => {
      console.log('clinicas', _data);
      this.clinicasArr = _data;

      for (let i = 0; i < _data.length; i++) {
        const element = _data[i];

        let _lat = element.value.lat;
        let _lng = element.value.lng;
        let _nome = element.value.nome;

        let itemMarker = {
          lat: _lat,
          lng: _lng,
          nome: _nome,
          abrev: _nome[0]
        }
        
        this.carregaDadosMapa(itemMarker);
      }
    })
  }

  carregaDadosMapa(itemMarker) {

    // Cria o marcador (pino)
    const marker = this.addMarker(itemMarker.lat, itemMarker.lng, itemMarker.nome, itemMarker.abrev);
    
    // Cria o infowindow
    const infowindow = this.addInfoWindow(itemMarker.nome);

    marker.addListener("click", () => { // Evento de clique no marcador
      
      // Abre o infowindow e associa ao marcador
      infowindow.open({
        anchor: marker,
        map: this.map,
      });
    });

    marker.setMap(this.map); // Adiciona o marcador ao mapa

  }

  createMap(mapElement) {
    if(mapElement !== null && mapElement.nativeElement !== null && google) {
      let options = {
        zoom: 7,
        center: {lat: -5.082831943557843, lng: -39.706814046809775}
      };

      return new google.maps.Map(mapElement.nativeElement, options);
    }

    return undefined;
  }

  addMarker(_lat, _lng, nome, abrev) {
    return new google.maps.Marker({
      position: {lat: _lat, lng: _lng},
      title: nome,
      icon: new google.maps.MarkerImage(
        'https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-a.png&ax=44&ay=48&scale=1&text=' + abrev
      )
    })
  }

  addInfoWindow(texto: string) {
    let contentHtml = `
     ${texto}
    `;

    return new google.maps.InfoWindow({
      content: contentHtml
    })
  }

    gerarCSV() {
      this.exportProvider.gerarCSV(this.exportarDados(), 'clinicas');
    }

    gerarExcel() {
      // console.log('jsonArr', jsonArr);
      this.exportProvider.gerarExcel(this.exportarDados(), 'clinicas');
    }

    gerarPDF() {
      this.exportProvider.gerarPDF(this.exportarDados(), 'clinicas');
  }

  private exportarDados() {
    let jsonArr = [];

    for (let i = 0; i < this.clinicasArr.length; i++) {
      const element = this.clinicasArr[i];
      
      const key = element.key;
      const value = element.value;

      let _item = {
        'Cidade': value.cidade,
        'UF': value.uf,
        'Endereço': value.endereco,
        'Latitude': value.lat,
        'Longitude': value.lng,
        'Link': 'https://www.google.com/maps/?q=' + value.lat + ',' + value.lng,
      };

      jsonArr.push(_item);
    }

    return jsonArr;
  }

  }

