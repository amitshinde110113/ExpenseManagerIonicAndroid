import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
token;isloggedit=false
  constructor(public authService: AuthService,private route:ActivatedRoute,private router:Router) {
    
   }
  canActivate(): boolean {
    if(localStorage.getItem('token')!==null){
      console.log('logged in');
      
      this.isloggedit=true
     return true

    }else{

      this.isloggedit=false
      console.log('logged out');
      this.router.navigate(['../home'])
      return false

    }
  }
 
}
