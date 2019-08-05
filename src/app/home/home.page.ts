import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { CropperComponent } from 'angular-cropperjs';
//import { Base64 } from '@ionic-native/base64/ngx';
import { File } from '@ionic-native/file/ngx'
import { Crop } from '@ionic-native/crop/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  @ViewChild('angularCropper') public angularCropper:CropperComponent
  cropperOptions: any;
  croppedImage = null;
  croppingOptions=false;
  myImage = null;
  scaleValX = 1;
  scaleValY = 1;
user:FormGroup
userReg:FormGroup
imageselection
register=false;
login="Login"
url
  constructor(
     private file: File,
     private toaster:ToastController,
     private fb:FormBuilder,
     private fb2:FormBuilder,
     private authService:AuthService,
     private router:Router,
     private alertControl:AlertController) {

      this.initilizeForms();
  }
  ngOnInit(): void {
    
  }

  initilizeForms(){
    this.user=this.fb.group({
      name:['',[Validators.required]],
      password:['',[Validators.required]],
    })
    this.userReg=this.fb2.group({
      name:['',[Validators.required]],
      password:['',[Validators.required]],
      fname:[],
      confirmPassword:[],
      profiePic:[]
    })
    this.cropperOptions = {
      dragMode: 'crop',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 0.8,
    };
  }
  onSubmit(){
    this.croppingOptions=false
    let pwd = this.user.get('password').value
    const inputeData=new FormData();
    let data = {
      email: this.user.get('name').value,
      password: CryptoJS.AES.encrypt(pwd.trim(), (this.user.get('name').value).trim()).toString()
      }
   
    if(this.register){
      let pwd = this.userReg.get('password').value
      inputeData.append("email",this.userReg.get('name').value)
      inputeData.append("password",CryptoJS.AES.encrypt(pwd.trim(), (this.userReg.get('name').value).trim()).toString())
      inputeData.append("name",this.userReg.get('fname').value)
      inputeData.append("profiePic",this.userReg.get('profiePic').value)
     // console.log(this.userReg.get('profiePic').value);
      this.authService.signUp(inputeData).subscribe((res:any)=>{
        localStorage.setItem('token',res.Token)
        localStorage.setItem('user',res.user)
        this.authService.loggedIn(res.Token)
       this.presentToast()
        
         //console.log(res);
         this.router.navigate(['../list'])
       })

    }
    else{ 
      this.authService.login(data).subscribe((res:any)=>{
        
      localStorage.setItem('token',res.Token)
      localStorage.setItem('user',res.user)
     // this.authService.loggedIn(res.Token)
     this.presentToast()
      
      // console.log(res);
       this.router.navigate(['../list'])
     })
    }
    
   console.log(this.user.get('name').value);
    }
    async presentToast() {
      const toast = await this.toaster.create({
        message: 'Logged In successfully.',
        duration: 2000,
        position: 'top',
      });
      toast.present();
    }
    regestration(){
      this.register=true;
      this.login='Register'
    }
    backToLogin(){
      this.register=false;
      this.login='Login'
    }
   async changeListener(event){

     this.croppingOptions=true
      if(event.target.files.length>0){
         this.imageselection=true;
         const img=event.target.files[0];
         this.userReg.patchValue({profiePic:img})
            if (event.target.files && event.target.files[0]) {
              var reader = new FileReader();
              reader.readAsDataURL(event.target.files[0]); // read file as data url
              reader.onload = (event) => { 
              console.log(this.url);
              this.myImage=reader.result
              this.url = reader.result;
              }
      }
    }
  // console.log(this.userReg.get('profiePic').value)
     
    }  

    rotate() {
      this.angularCropper.cropper.rotate(90);
    }
   
    zoom(zoomIn: boolean) {
      let factor = zoomIn ? 0.1 : -0.1;
      this.angularCropper.cropper.zoom(factor);
    }
   
    scaleX() {
      this.scaleValX = this.scaleValX * -1;
      this.angularCropper.cropper.scaleX(this.scaleValX);
    }
   
    scaleY() {
      this.scaleValY = this.scaleValY * -1;
      this.angularCropper.cropper.scaleY(this.scaleValY);
    }
   
    move(x, y) {
      this.angularCropper.cropper.move(x, y);
    }
   
    
    save() {
      let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg',);
     this.angularCropper.cropper.getCroppedCanvas().toBlob((blob)=>{
          const blob1 = new Blob([blob], { type: 'image/jpeg' });
     // const imageFile =new File([blob1], (this.userReg.get('profiePic').value).name, { type: 'image/jpeg' });
          
          
        //  console.log("new generated",imageFile);
         this.userReg.patchValue({profiePic:blob1})
        //  this.file.
      });

      this.croppedImage = croppedImgB64String;
      
      //const imageBlob = this.dataURItoBlob(this.croppedImage);
    //  const imageFile = new File([imageBlob], (this.userReg.get('profiePic').value).name, { type: 'image/jpeg' });
     // this.userReg.patchValue({profiePic:imageFile})
      //console.log(imageFile);

      

    }
  //   dataURItoBlob(dataURI) {
     
  //     const byteString = window.atob(dataURI.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
  //     const arrayBuffer = new ArrayBuffer(byteString.length);
  //     const int8Array = new Uint8Array(arrayBuffer);
  //     for (let i = 0; i < byteString.length; i++) {
  //       int8Array[i] = byteString.charCodeAt(i);
  //     }
  //     const blob = new Blob([int8Array], { type: 'image/jpeg' });    
  //     return blob;
  //  }
    
}
