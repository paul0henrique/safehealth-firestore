import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { User } from 'firebase';
import { UserProvider } from '../providers/user/user';

import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public userProvider: UserProvider
    
    ) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      
      { title: 'Médicos', component: 'MedicosListPage', icon: 'pulse'},
      { title: 'Pacientes', component: 'PacientesListPage', icon: 'people'},
      { title: 'Clínicas', component:  'ClinicasListPage', icon:'md-medkit'},
      { title: 'Configurações', component: 'ConfiguracoesPage', icon: 'settings' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.userProvider.lerLocal().then(_usuario => {
        console.log('AP COMPONENT', _usuario);

        if(_usuario && _usuario.length > 0) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = 'LoginPage';
        }

      })
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.userProvider.removeLocal().then(_data => {
      this.nav.setRoot('LoginPage');
    });
  }
}
