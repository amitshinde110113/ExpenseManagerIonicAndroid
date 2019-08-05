import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SummaryPage } from './summary.page';
import { HttpService } from 'src/app/http.service';
import { HttpClientJsonpModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: SummaryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientJsonpModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SummaryPage]
  ,providers:[HttpService]
})
export class SummaryPageModule {}
