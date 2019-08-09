import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

import { IonicModule } from '@ionic/angular';

import { AddExpencePage } from './add-expence.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: AddExpencePage
  // }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddExpencePage],
  providers:[ToastController,AlertController]
})
export class AddExpencePageModule {}
