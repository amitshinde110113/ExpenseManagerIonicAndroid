import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
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
   //this.token= localStorage.getItem('token')
  
   if(this.token!==null){
    console.log(this.token);
    this.authState=true
    this.isAuthenticated()
   }else{
   // 
   this.authState=false
   }
 return this.authState
         
  }

  isAuthenticated() {
   // return this.authState
  }
  loggedIn(token) {
    // this.token=token;
    // this.ifLoggedIn()
    
    
    //   this.authState=true
    //   this.router.navigate(['../list'])
   
  }
 
  loggedOut() {
      // localStorage.clear()
      // this.authState=false
      // this.ifLoggedIn()
      // this.isAuthenticated()
  
     
   
  }


  baseUrl='http://192.168.0.134:3000/users/';
  login(data){
    return this.http.post(this.baseUrl+'login',data)
  }
  signUp(data){
    return this.http.post(this.baseUrl+'signup',data)
  }
}
