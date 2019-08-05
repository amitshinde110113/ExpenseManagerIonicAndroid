import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
user:any; expense={
  name:'',
  share:0
}
email
url=""
time:any=[];
flag=1;
  constructor(private httpService:HttpService,private route:ActivatedRoute) { 
    if(this.flag === 1)
    {
      this.flag = 0;
      route.params.subscribe(data=>{
        this.expense={
          name:'',
          share:0
        }
        this.url=""
        this.email=localStorage.getItem('user');
        console.log(data);
        
        this.loadData()
        
      })
    }
  }
  
  ngOnInit()
  {
    if(this.flag!==0)
    {
      this.loadData()
    }
  }

loadData()
{
  console.log(this.email);
  
  this.httpService.getUser(this.email).subscribe(res=>{
    this.user=res;
    console.log(res);
    
    this.url="http://192.168.0.134:3000/"+this.user.profiePic
    console.log(this.user.profiePic);
    this.calculateExpense(res)
  })
}

calculateExpense(res)
{
  res.expenses.map((expense:any,idx)=>{
  //console.log(expense.time);
   this.time.push(expense.time)
    expense.shares.map((share,i)=>{
      if(share.email.email===this.email)
      {   this.expense={
        name:share.email.name,
        share:this. expense.share+ share.share
      }
    }
   
    })
     
   // this.users.push(user.name)
   })
   console.log(this.expense);
   
}

}
