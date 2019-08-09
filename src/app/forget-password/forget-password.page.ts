import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import * as CryptoJS from 'crypto-js';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
userReg:FormGroup
isUser=false;
hasOTP=false
hasPassword=true
OTP
email
  constructor(private fb:FormBuilder,private authService:AuthService,private toaster:ToastController,private router:Router) {
    this.userReg=this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      confirmPassword:[],
      OTP:[]
     
    })
   }

  ngOnInit() {

  }
    submitEmail()
    { this.email=this.userReg.get('email').value
      this.authService.getOTP(this.email).subscribe((data:any)=>{
        this.presentToast('OTP sent to your mail',"success")
        console.log(data);
        
        this.isUser=true;
        this.hasPassword=false
        this.OTP=data.OTP
      },err=>{
        console.log(err);
        this.presentToast('Opps..User not found,Try again',"danger")
      })
      
    }

    submitOTP(){
      if(this.OTP===this.userReg.get('OTP').value)
      {
        this.isUser=false;
        this.hasOTP=true
        
      }
      else{
        this.presentToast('Opps..please enter valid OTP',"danger")

      }
    }
    onSubmit()
    {  
      
      
      if(this.userReg.get('password').value===this.userReg.get('confirmPassword').value){
          let pwd = this.userReg.get('password').value
          let data={
                  email:this.userReg.get('email').value,
                  password:CryptoJS.AES.encrypt(pwd.trim(), (this.userReg.get('email').value).trim()).toString()
            }
            this.authService.resetPassword(data).subscribe(data=>{
           this.presentToast('Password changed successfully',"success")
                      this.router.navigate(['../home'])


            },err=>{
        this.presentToast('Opps..Something went wrong,Try again',"danger")

            })
            
    }else{
      this.presentToast('Opps..Password not match',"danger")
      
    }
      
    
    }


    async presentToast(msg,color) {
      const toast = await this.toaster.create({
        message: msg,
        duration: 2000,
        position: 'top',
        color:color
      });
      toast.present();
    }

}
