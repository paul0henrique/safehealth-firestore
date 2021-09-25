import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientesFormPage } from './pacientes-form';

@NgModule({
  declarations: [
    PacientesFormPage,
  ],
  imports: [
    IonicPageModule.forChild(PacientesFormPage),
  ],
})
export class PacientesFormPageModule {}
