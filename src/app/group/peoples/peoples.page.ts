import { Component, OnInit } from '@angular/core';

import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.page.html',
  styleUrls: ['./peoples.page.scss'],
})
export class PeoplesPage implements OnInit {
  localUrl:any=JSON.parse(localStorage.getItem('profilePictures'))
  groups:any=JSON.parse(localStorage.getItem('groups')) ||[]
  users:any=JSON.parse(localStorage.getItem('group')).users
  group:any=JSON.parse(localStorage.getItem('group'))
  userids:any=[]
  role:any={}
 baseUrl='http://192.168.0.134:3000/'

  url=[]
  constructor(private httpService:HttpService) {
    this.groups.map(group=>{
      if(group.name===JSON.parse(localStorage.getItem('group')).name)
      { 
        this.users=group.usr
        this. profilePicUrls(this.users)    
      }    
    })   
   }

  ngOnInit() {
 
    JSON.parse(localStorage.getItem('group')).users.map(user=>{
        if(user.role=="Admin"){
          this.role=user 
        }
    })
    this.users.map(user=>{
      this.userids.push(user._id)
    })
     }
profilePicUrls(res){
  res.map(user=>{
    this.url.push({name:user.name,url:this.baseUrl+user.profiePic}  )
 
}) 
}
}
