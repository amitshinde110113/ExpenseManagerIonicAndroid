import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupComponent } from './group/group.component';
import { PeoplesPage } from './group/peoples/peoples.page';
import { ExpensesPage } from './group/expenses/expenses.page';
import { AddExpencePage } from './group/add-expence/add-expence.page';
import { GroupPage } from './group/group/group.page';
import { ProfilePage } from './profile/profile.page';
import { SummaryPage } from './group/summary/summary.page';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
    canActivate:[AuthGuardService]
    
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
    
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate:[AuthGuardService]


  }
  ,{
    path:'createGroup',
    component:CreateGroupComponent,
    canActivate:[AuthGuardService]

  }
  ,
  {
    path:'profile',
    component:ProfilePage,
    canActivate:[AuthGuardService]
  }
  ,
  {path:'viewgroup/summary',component:SummaryPage, canActivate:[AuthGuardService]} ,
  //{path:'viewgroup/mambers',component:PeoplesPage} ,
  //    {path:'viewgroup/expences',component:ExpensesPage},
   //  {path:'viewgroup/addexpences',component:AddExpencePage},
  { path: 'peoples', loadChildren: './group/peoples/peoples.module#PeoplesPageModule' },
  { path: 'expenses', loadChildren: './group/expenses/expenses.module#ExpensesPageModule' },
  { path: 'add-expence', loadChildren: './group/add-expence/add-expence.module#AddExpencePageModule' },
  { path: 'group', loadChildren: './group/group/group.module#GroupPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
