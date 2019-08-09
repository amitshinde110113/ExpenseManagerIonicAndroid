import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';
import { ToastController } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { GroupComponent } from './group/group.component';

import { AlertController} from '@ionic/angular';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { Contacts} from '@ionic-native/contacts/ngx';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { GroupPageModule } from './group/group/group.module';
import { PeoplesPageModule } from './group/peoples/peoples.module';
import { SummaryPageModule } from './group/summary/summary.module';
import { ExpensesPageModule } from './group/expenses/expenses.module';
import { AddExpencePageModule } from './group/add-expence/add-expence.module';
import { ProfilePageModule } from './profile/profile.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ForgetPasswordPageModule } from './forget-password/forget-password.module';



@NgModule({
  declarations: [AppComponent,CreateGroupComponent,GroupComponent,],
  entryComponents: [],
  imports: [
    
    BrowserModule,
    AngularCropperjsModule,
    ForgetPasswordPageModule,
    ReactiveFormsModule,
    GroupPageModule,
    PeoplesPageModule,
    ProfilePageModule,
    SummaryPageModule,
    ExpensesPageModule,
    AddExpencePageModule,
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
    LoadingController,
    AuthGuardService,
    Contacts,
    AlertController,
    HttpService,NativeStorage,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
