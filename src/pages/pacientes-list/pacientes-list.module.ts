import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientesListPage } from './pacientes-list';

@NgModule({
  declarations: [
    PacientesListPage,
  ],
  imports: [
    IonicPageModule.forChild(PacientesListPage),
  ],
})
export class PacientesListPageModule {}
