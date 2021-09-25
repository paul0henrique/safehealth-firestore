import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientesFilterPage } from './pacientes-filter';

@NgModule({
  declarations: [
    PacientesFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(PacientesFilterPage),
  ],
})
export class PacientesFilterPageModule {}
