import { Component, OnInit } from '@angular/core';
import { SummaryResolver } from '@angular/compiler';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.page.html',
  styleUrls: ['./peoples.page.scss'],
})
export class PeoplesPage implements OnInit {
  users:any=JSON.parse(localStorage.getItem('group')).users
  group:any=JSON.parse(localStorage.getItem('group'))
  userids:any=[]
  role:any={}
  baseUrl='http://192.168.0.134:3000/'
  constructor(private httpService:HttpService) { }
url=[]
  ngOnInit() {
    console.log(JSON.parse(localStorage.getItem('group')));
    JSON.parse(localStorage.getItem('group')).users.map(user=>{
        if(user.role=="Admin"){
          this.role=user
         console.log("------------",this.role);
          
        }
    })
    this.users.map(user=>{
      this.userids.push(user._id)
    })
    this.httpService.getUsers(this.userids).subscribe(result=>{
      //console.log(result);
      this.users=result
      this.users.map(user=>{
          this.url.push(this.baseUrl+user.profiePic)
      }) 
      })
    

  }

}
