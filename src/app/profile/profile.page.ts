import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ImagesService } from '../images.service';
import { CropperComponent } from 'angular-cropperjs';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 
  @ViewChild('angularCropper') public angularCropper:CropperComponent
  cropperOptions: any;
  croppedImage = null;
  croppingOptions=false;
  myImage = null;
  scaleValX = 1;
  scaleValY = 1;

userReg:FormGroup
imageselection
register=false;
cropper=false
login="Login"



user:any =JSON.parse(localStorage.getItem('userDetails'))  || ''; 
url:any=localStorage.getItem('profile')  || ''; 
expense={
  name:'',
  share:0
}
email

time:any=[];
flag=1;

  constructor(
    private imageService: ImagesService,
    private toaster:ToastController,
    private authService : AuthService,
    private httpService:HttpService,
    private route:ActivatedRoute,
    private nativeStorage:NativeStorage) { 
  
    if(this.flag === 1)
    { 
    
      this.flag = 0;
      route.params.subscribe(data=>{
        this.expense={
          name:'',
          share:0
        }
        this.email=localStorage.getItem('user');
        this.loadData()
        
      })
    }
  }
  
  ngOnInit()
  {
    this.cropperOptions = {
      dragMode: 'crop',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 0.8,
    };
    if(this.flag!==0)
    {
      this.loadData()
    }
  }

loadData()
{
  this.httpService.getUser(this.email).subscribe(res=>{
    this.user=res;
    localStorage.setItem('userDetails',JSON.stringify(res))
    this.nativeStorage.setItem('myData',{userDetails :JSON.stringify(res)})
    this.url="http://192.168.0.134:3000/"+this.user.profiePic
    
   this.imageService.getBase64ImageFromURL(this.url).subscribe(base64data=>{
     
    localStorage.setItem("profile",base64data)
   }) 

    this.calculateExpense(res)

  },err=>{this.calculateExpense(this.user)})
}

calculateExpense(res)
{
  res.expenses.map((expense: any, idx) => {
    this.time.push(expense.time)
    expense.shares.map((share, i) => {
      if (share.email.email === this.email) {
      this.expense = {
        name: share.email.name,
        share: this.expense.share + share.share
      }
      }
    })
  })
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
  let croppedImgB64String: string = this.angularCropper.cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.5);
 this.angularCropper.cropper.getCroppedCanvas().toBlob((blob)=>{
 
this.croppedImage = croppedImgB64String;
this.url=this.croppedImage
let formdata=new FormData()
formdata.append("profiePic",blob)
formdata.append("email",this.user.email)
formdata.append("oldProfile",this.user.profiePic)


this.authService.updateProfile(formdata).subscribe(data=>{
 this.presentToast("Updated successfully","success")
},err=>{
 this.presentToast("Oops..something went wrong","danger")

})
  },'image/jpeg',0.4);
 
  this.cropper=false  

  
}  

async changeListener(event){

  this.croppingOptions=true
   if(event.target.files.length>0){
      this.imageselection=true;
      const img=event.target.files[0];
         if (event.target.files && event.target.files[0]) {
           var reader = new FileReader();
           reader.readAsDataURL(event.target.files[0]); // read file as data url
           reader.onload = (event) => { 
           this.myImage=reader.result
           }
   }
 }

  
 }  

 async presentToast(message,color) {
  const toast = await this.toaster.create({
    message: message,
    duration: 1000,
    position: 'top',
    color:color,
    mode:'ios',
  });
  toast.present();
}
}
