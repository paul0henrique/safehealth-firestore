import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Clinica } from '../../models/clinica';
import { ClinicaProvider } from '../../providers/clinica/clinica';

@IonicPage()
@Component({
  selector: 'page-clinicas-form',
  templateUrl: 'clinicas-form.html',
})
export class ClinicasFormPage {
  titulo = '';

  itemID = undefined;
  item = new Clinica();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public clinicaProvider: ClinicaProvider
    ) {

      const itemID = this.navParams.get('itemID');
      const item = this.navParams.get('item');

      console.log(itemID)
      console.log(item)

      if(itemID) { // tem itemID?
        this.itemID = itemID;
        this.item = item;

        this.titulo = 'Atualizar';

      } else {
        this.itemID = undefined;
        this.item = new Clinica();

        this.titulo = 'Inserir';
      }
  }

  ionViewDidLoad() {
    
  }

  salvar() {
    console.log(this.item);

    if(this.itemID) { // atualizar

      this.clinicaProvider.atualizarFS(this.itemID, this.item).then(_ => {
        this.presentToast('Clínica atualizada com sucesso!');
        this.navCtrl.pop();
      })

    } else { // inserir

      this.clinicaProvider.inserirFS(this.item).then(_ => {
        this.presentToast('Clínica inserida com sucesso!');
        this.navCtrl.pop();
      });
    }
  }

  excluir() {

    const confirm = this.alertCtrl.create({
      title: 'Excluir?',
      message: 'Tem certeza que deseja excluir este item?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            
            this.clinicaProvider.removerFS(this.itemID)
              .then(_ => {
                console.log('ok')
                this.navCtrl.pop();
                this.presentToast('Clínica removida com sucesso!');
              })
              .catch(error => {
                console.log('error', error);
              })

          }
        }
      ]
    });
    confirm.present();
  }

  presentToast(mensagem) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'position',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
