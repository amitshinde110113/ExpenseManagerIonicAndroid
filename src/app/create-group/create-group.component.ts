import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ToastController } from '@ionic/angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
user:FormGroup;members=[];isMember=false;contactlist
  constructor(private contacts:Contacts,private platform: Platform,private toaster:ToastController,private fb:FormBuilder,private router:Router,private httpService:HttpService) { 
    //this.platform.backButton.subscribe(() => { console.log("TEST"); });
    //this.platform.backButton.subscribe(()=>{ navigator['app'].exitApp();}
  }

  ngOnInit() {
    
    // this.contacts.find(['displayName', 'phoneNumbers'], {filter: "", multiple: true})
    // .then(data => {
    //   alert("len= "+data.length);
    //   this.contactlist = data;
    //   alert(JSON.stringify(data));
    // // });
    // this.contacts.pickContact().then(contact=>{
    //   console.log(contact);
      
    // }).catch(er=>{console.log(er);
    // })
    this.user=this.fb.group({
      name:['',[Validators.required]],
      member:[localStorage.getItem('user'),[Validators.required]],
     
    })
    this.onAddMember()
    
  }
onSubmit(){
  let data={members:this.members,
  name:this.user.get('name').value}
  this.httpService.createGroup(data).subscribe(res=>{
    this.router.navigate(['../list'])

   // this.router.navigate(['../list'])
  })


}
onAddMember(){
  let data={member:this.user.get('member').value}
  this.httpService.checkMember(data).subscribe((res:any)=>{
    console.log("member available",res);
    
     // this.members.push(this.user.get('member').value);
     // this.members.push(this.user.get('member').value);
   this.members.push({_id:res._id,email:res.email,name:res.name, role: ((localStorage.getItem('user')===res.email)?'Admin':"mamber")});
     if(this.members.length>1){
       this.isMember=true;
     }
    this.user.patchValue({member:''})
        
  },err=>{
    this.presentToast()
  })
  
  
}

async presentToast() {
  const toast = await this.toaster.create({
    message: 'Member not found.',
    duration: 2000,
    position: 'top',
    color:'danger'
  });
  toast.present();
}
}
