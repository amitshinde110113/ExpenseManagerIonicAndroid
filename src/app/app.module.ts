import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GroupComponent } from './group/group.component';
import { PeoplesPage } from './group/peoples/peoples.page';
import { ExpensesPage } from './group/expenses/expenses.page';
import { AddExpencePage } from './group/add-expence/add-expence.page';
import { GroupPage } from './group/group/group.page';
import { ProfilePage } from './profile/profile.page';
import { SummaryPage } from './group/summary/summary.page';
import { MenuController, AlertController, ActionSheetController } from '@ionic/angular';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [AppComponent,CreateGroupComponent,GroupComponent,PeoplesPage,ExpensesPage,AddExpencePage,GroupPage,ProfilePage,SummaryPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularCropperjsModule,
    ReactiveFormsModule,
  
   HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ToastController,
    AuthGuardService,
    AuthService,
    AuthGuardService,
    Contacts,
    AlertController,
    HttpService,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
