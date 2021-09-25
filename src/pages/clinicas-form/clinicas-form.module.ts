import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicasFormPage } from './clinicas-form';

@NgModule({
  declarations: [
    ClinicasFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicasFormPage),
  ],
})
export class ClinicasFormPageModule {}
