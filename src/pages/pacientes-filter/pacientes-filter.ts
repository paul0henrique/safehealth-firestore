import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PacientesFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pacientes-filter',
  templateUrl: 'pacientes-filter.html',
})
export class PacientesFilterPage {

  cidade = '';
  uf = '';
  
  ufArr = [
    'CE',
    'PE',
  ]

  cidadeArr = [
    'Fortaleza',
    'Boa Viagem',
    'Eusébio'
  ];


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientesFilterPage');
  }

  filtrar(){
    const params = {
      uf: this.uf,
      cidade: this.cidade,
      isLimpar: false
    };
    this.viewCtrl.dismiss(params);
  };

  limpar(){
    const params = { 
      uf: this.uf,
      cidade: this.cidade,
      isLimpar: true
    };
    this.viewCtrl.dismiss(params);

  }

  fechar(){
    //const params = { cidade: this.cidade };
    //this.viewCtrl.dismiss(params);
    this.viewCtrl.dismiss();
  }

}
