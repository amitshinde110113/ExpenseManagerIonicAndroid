import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HomePage } from './home.page';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Crop } from '@ionic-native/crop/ngx';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { File } from '@ionic-native/file/ngx'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AngularCropperjsModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],providers:[AuthService,Crop,ToastController,File,HttpClient]
})
export class HomePageModule {}
