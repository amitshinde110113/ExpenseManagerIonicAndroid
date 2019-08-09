import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForgetPasswordPage } from './forget-password.page';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ForgetPasswordPage
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgetPasswordPage],providers:[AuthService,ToastController]
})
export class ForgetPasswordPageModule {}
