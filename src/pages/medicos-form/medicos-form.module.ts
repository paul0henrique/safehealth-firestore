import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicosFormPage } from './medicos-form';

@NgModule({
  declarations: [
    MedicosFormPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicosFormPage),
  ],
})
export class MedicosFormPageModule {}
