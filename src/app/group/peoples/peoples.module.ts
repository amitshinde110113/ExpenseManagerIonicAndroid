import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PeoplesPage } from './peoples.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PeoplesPage
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PeoplesPage],
  providers:[NativeStorage]
})
export class PeoplesPageModule {}
