import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { PacienteProvider } from '../../providers/paciente/paciente';

@IonicPage()
@Component({
  selector: 'page-pacientes-list',
  templateUrl: 'pacientes-list.html',
})
export class PacientesListPage {

  pacientes = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public pacienteProvider: PacienteProvider,
    public modalCtrl: ModalController
    ) {

      this.carregaLista();
  }

  addItem() {
    this.navCtrl.push('PacientesFormPage');
  }

  editItem(item) {
    const pacienteID = item.key;
    const paciente = item.value;

    this.navCtrl.push('PacientesFormPage', { itemID: pacienteID, item: paciente } );
  }

  openFilter(){
    const modal = this.modalCtrl.create('PacientesFilterPage');
    //let cidade = ?;
    
    modal.onDidDismiss(_params => {
      
      if(_params !== undefined) {

        if(_params.isLimpar) {
          console.log('islimpar');
          this.carregaLista();

        } else {
          
          let uf = _params.uf;
          let cidade = _params.cidade;
          console.log('uf', uf);
          console.log('cidade', cidade);
          
          this.pacienteProvider.buscarFS(uf, cidade).subscribe(_data => {
            console.log('buscar', _data);
            this.pacientes = _data;
          });
        }

      }
    });

    modal.present();
  }

  carregaLista() {
    this.pacienteProvider.listarFS().subscribe(_data => {
      console.log(_data);
      this.pacientes = _data;
    })
  }

}
