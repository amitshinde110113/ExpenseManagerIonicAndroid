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
//  baseUrl='http://192.168.0.134:3000/'
// baseUrl="175.100.138.135:3000/"
    baseUrl= "https://expensemanager110113.herokuapp.com/"

  url=[]
  constructor(private httpService:HttpService) {
    this.groups.map(group=>{
      if(group.name===JSON.parse(localStorage.getItem('group')).name)
      { 
        this.users=group.usr
       console.log(group);
        
        this. profilePicUrls(this.users)   
        // this.localUrl.map(groupName=>{
        //   if(group.name===groupName.group){
        //     //console.log("---------",groupName.group);
        //   //  this.userData=groupName.user
        //     this.url=groupName.user
        //   }
        // })
      }
      
    })
    
   }

  ngOnInit() {
  // console.log("ddddddddddddd",this.url,this.users);
   
  //  console.log(JSON.parse(localStorage.getItem('group')));
    JSON.parse(localStorage.getItem('group')).users.map(user=>{
        if(user.role=="Admin"){
          this.role=user
      console.log("------------",this.role);
          
        }
    })
    this.users.map(user=>{
      this.userids.push(user._id)
    })
    // this.httpService.getUsers(this.userids).subscribe(result=>{
    //   console.log(result);
    //   this.users=result
    // // this. profilePicUrls(this.users)
    //   })
    

  }
profilePicUrls(res){
  res.map(user=>{
    this.url.push({name:user.name,url:this.baseUrl+user.profiePic}  )
    
   // console.log(user);
    
}) 
}
}
