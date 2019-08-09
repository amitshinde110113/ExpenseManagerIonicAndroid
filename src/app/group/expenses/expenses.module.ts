import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpensesPage } from './expenses.page';
import { ToastController } from '@ionic/angular';

const routes: Routes = [
  // {
  //   path: '',
  //   component: ExpensesPage
  // }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpensesPage],
  providers:[ToastController]
})
export class ExpensesPageModule {}
