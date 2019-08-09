import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  selectedItem: any;admins:any=[]
//  baseUrl='http://192.168.0.134:3000/'
 
  baseUrl= "https://expensemanager110113.herokuapp.com/"

  slideOpts = {
    initialSlide: 1,
    speed: 400,
    mode:'md'
  };profilePictures:any=[]
   groups:any =JSON.parse(localStorage.getItem('groups')) || [];
   flag=1;
   
  constructor(private router:Router,
    private nativeStorage: NativeStorage,
    private httpService:HttpService,
    private route:ActivatedRoute,
    private alertController: AlertController,
    private toaster:ToastController) {
 
        if(this.flag==1){
          this.flag=0;
          route.params.subscribe(value=>{
           
            localStorage.removeItem('group')
            this.getData()
            
          })
        }
  
  }

  getData(){
    this.admins=[]
    
    
        
    let email=localStorage.getItem('user');
    this.httpService.getGroups(email).subscribe((res:any)=>{
      // this.nativeStorage.setItem('myData', {userDetails: JSON.stringify(res), groups: JSON.stringify(res.groups),})
      //  .then(
      //   () => console.log('Stored item!'),
      //  error => console.error('Error storing item', error)
      // );

      console.log("res",res,"user",email);
   localStorage.setItem('userDetails',JSON.stringify(res))
      localStorage.setItem('groups',JSON.stringify(res.groups))
      this.groups=res.groups;
    //  console.log(this.groups);
      this.groups.map((group,idx)=>{
        this.profilePictures.push({group:group.name,user:[]})
     
        group.usr.map(async user=>{
         // console.log(this.profilePictures.user);
      //  
         // localStorage.setItem('profile',base64Image)
        //  if(email===user.email)
        //   {
        //    localStorage.setItem('profile',this.baseUrl+user.profiePic)
        //   }

          this.profilePictures[idx].user.push({name:user.name,email:user.email,url:this.baseUrl+user.profiePic})
          console.log(this.profilePictures);
          localStorage.setItem('profilePictures',JSON.stringify(this.profilePictures))
         // this.nativeStorage.setItem('myData', {profilePictures: JSON.stringify(this.profilePictures)})
       

          
        })
      })
        this.groups.forEach(group=>{
        group.users.forEach(user=>{
            this.admins.push({group:group.name,user:user.name,role:user.role})
        })
          
        })
     
        
      })
  }
  ngOnInit() {
    
    if(localStorage.getItem('token')){
      if(this.flag===1){
        this.getData()
       }
       this.flag=1; 
      }else{
        this.router.navigate(['../home'])

      }
    }
  
  

  addGroup(){
    this.router.navigate(['../createGroup'])
  }
  setItem(group){
    localStorage.setItem('group',JSON.stringify(group))
   // console.log(group);
    this.router.navigate(['../viewgroup'])
    
  }

  deleteGroup(group){
   // console.log(group);
   //------------Checking Admin-----------------
    group.users.forEach(user=>{
      if(user.role=="Admin"){
        if(user.email===localStorage.getItem('user')){
           this.httpService.deleteGroup(group).subscribe(res=>{
           //  console.log("------------------",res);
             this.getData()
      
              })
          
        }else{
           this.presentToast("Only admin can delete group","danger");

        }
        
      }
    })
    
  }
  changeName(group){
   this. myAlert_show(group)
    
}
getFromAlert(data,group) {
  //console.log(data,group._id);
  if(data.name1!==""){
    ///console.log(data.name1);
    
    this.httpService.editGroup(group._id,data.name1).subscribe(res=>{
   //   console.log("-------------",res);
      this.getData()
      this.presentToast("Changed Successfully","success");
    
  })
  }else{
    this.presentToast("Please enter group name","danger");
    
  }
 
  
}

async myAlert_show(group) {
  const myAlert = await this.alertController.create({
    header: 'Set new name',
   mode:'md',
   cssClass: 'alertCustomCss',
  
       buttons: [
      {
        text: 'OK',
        handler: data => {
          this.getFromAlert(data,group);
        },

      },
      {
        text: 'Cancel',
        role: "cancel",
        handler: data => {
                 },
      }
    ],
    inputs: [
      {
        name: 'name1',
        type: 'text',
        placeholder: 'Enter new name'
      },
    
    ]
  });
  await myAlert.present();
}
//------------------TOASTER-----------------
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
