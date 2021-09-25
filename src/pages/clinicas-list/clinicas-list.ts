import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClinicaProvider } from '../../providers/clinica/clinica';

@IonicPage()
@Component({
  selector: 'page-clinicas-list',
  templateUrl: 'clinicas-list.html',
})
export class ClinicasListPage {

  itemArr = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public clinicaProvider: ClinicaProvider
    ) {

      this.clinicaProvider.listarFS().subscribe(_data => {
        console.log(_data);
        this.itemArr = _data;
      })
  }

  addItem() {
    this.navCtrl.push('ClinicasFormPage');
  }

  editItem(item) {
    const clinicaID = item.key;
    const clinica = item.value;

    this.navCtrl.push('ClinicasFormPage', { itemID: clinicaID, item: clinica } );
  }


}
