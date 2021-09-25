import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Medico } from '../../models/medico';
import { MedicoProvider } from '../../providers/medico/medico';

@IonicPage()
@Component({
  selector: 'page-medicos-form',
  templateUrl: 'medicos-form.html',
})
export class MedicosFormPage {
  titulo = '';

  itemID = undefined;
  item = new Medico();

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public medicoProvider: MedicoProvider
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
        this.item = new Medico();

        this.titulo = 'Inserir';
      }
  }

  ionViewDidLoad() {
    
  }

  salvar() {
    console.log(this.item);

    if(this.itemID) { // atualizar

      this.medicoProvider.atualizarFS(this.itemID, this.item).then(_ => {
        this.presentToast('Médico atualizado com sucesso!');
        this.navCtrl.pop();
      })

    } else { // inserir

      this.medicoProvider.inserirFS(this.item).then(_ => {
        this.presentToast('Médico inserido com sucesso!');
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
            
            this.medicoProvider.removerFS(this.itemID)
              .then(_ => {
                this.presentToast('Médico removido com sucesso!');
                this.navCtrl.pop();
                console.log('ok')
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
