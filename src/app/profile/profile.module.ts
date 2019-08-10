import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ImagesService } from '../images.service';

import { ProfilePage } from './profile.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularCropperjsModule } from 'angular-cropperjs';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ProfilePage
  // }
];

@NgModule({
  imports: [
    
    CommonModule,
    FormsModule,
    AngularCropperjsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage],providers:[NativeStorage,ToastController,ImagesService]
})
export class ProfilePageModule {}
