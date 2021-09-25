import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicosListPage } from './medicos-list';

@NgModule({
  declarations: [
    MedicosListPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicosListPage),
  ],
})
export class MedicosListPageModule {}
