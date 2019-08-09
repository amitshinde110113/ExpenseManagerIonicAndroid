import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroupPage } from './group.page';
import { PeoplesPage } from '../peoples/peoples.page';
import { AuthGuardService } from 'src/app/auth-guard.service';
import { ExpensesPage } from '../expenses/expenses.page';
import { AddExpencePage } from '../add-expence/add-expence.page';
import { SummaryPage } from '../summary/summary.page';

const routes: Routes = [
  {
    path:'viewgroup',
    component:GroupPage,
    children:[
   { path: '', redirectTo: 'expences', pathMatch: 'full'},
     {path:'mambers',component:PeoplesPage, canActivate:[AuthGuardService]} ,
     {path:'expences',component:ExpensesPage, canActivate:[AuthGuardService]},
     {path:'addexpences',component:AddExpencePage, canActivate:[AuthGuardService]} ,
     
  ],
  },
  {path:'viewgroup/summary',component:SummaryPage, canActivate:[AuthGuardService]} ,


];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroupPage,]
})
export class GroupPageModule {}
