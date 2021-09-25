import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClinicasListPage } from './clinicas-list';

@NgModule({
  declarations: [
    ClinicasListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClinicasListPage),
  ],
})
export class ClinicasListPageModule {}
