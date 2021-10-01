import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { FirebaseStorageProvider } from '../../providers/firebase-storage/firebase-storage';
import { UserProvider } from '../../providers/user/user';



@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  @ViewChild('fileUserPhoto') fileUserPhoto;

  
  item = new User();
  foto = 'assets/imgs/user.png';
  isUploaded = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public firebaseStorageProvider: FirebaseStorageProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    this.userProvider.lerLocal().then(_userId => {
      this.userProvider.byId(_userId).subscribe(_user => {
        console.log('usuario', _user);
        this.item = new User();
        this.item.id = _userId;
        this.item.nome = _user['nome'];
        this.item.email = _user['email'];


        const path = '/user/' + this.item.id + '/foto.jpg';
        this.firebaseStorageProvider.downloadImageStorage(path).then(_data => {
          console.log('sucesso', _data)
          this.foto = _data;

          loader.dismiss();
        }).catch(error =>{
          console.log('erro', error)
          loader.dismiss();
          this.foto = 'assets/imgs/user.png';
        });

      })
    }) 
  }

  escolherFoto() {
    this.fileUserPhoto.nativeElement.click();
  }

  processWebImage($event){
    this.firebaseStorageProvider.processWebImage($event, (imageBase64, w, h) => {
      this.foto = imageBase64;
      this.isUploaded = true;
    });
  }


  salvar() {
    if(this.isUploaded) {
      this.firebaseStorageProvider.uploadImageStorage(this.foto, '/user/' + this.item.id + '/foto.jpg');
    }
  }

}