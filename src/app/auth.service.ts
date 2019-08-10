import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Platform } from '@ionic/angular';

import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token
  authState = false;
  constructor(private http:HttpClient, private platform: Platform,private router:Router) { 
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }
  ifLoggedIn() {
  
   if(this.token!==null){
    this.authState=true
    this.isAuthenticated()
   }else{
   // 
   this.authState=false
   }
 return this.authState
         
  }

  isAuthenticated() {
  
  }
  loggedIn(token) {
    
  }
 
  loggedOut() {
    
  }


   baseUrl='http://192.168.0.134:3000/users/';
//  baseUrl="175.100.138.135/users/"


  login(data){
    return this.http.post(this.baseUrl+'login',data)
  }
  signUp(data){
    return this.http.post(this.baseUrl+'signup',data)
  }
  getOTP(email){
    return this.http.post(this.baseUrl+'getotp',{email:email})
  }
  resetPassword(data){
    return this.http.post(this.baseUrl+'resetpassword',data)
  }
  updateProfile(formdata){
    return this.http.patch(this.baseUrl+'update',formdata)

  }
}
