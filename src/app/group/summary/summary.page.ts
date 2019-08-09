import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
group=JSON.parse(localStorage.getItem('group'));
total=0; users:any=[];expense:any=[]
groups:any=JSON.parse(localStorage.getItem('groups')) || []

constructor(private httpService:HttpService,private router:Router) {
  this.groups.map(group=>{
    if(group.name===JSON.parse(localStorage.getItem('group')).name)
    {
       this.calculate(group)
      
    }
  })
 }
  ngOnInit() {
 
    this.httpService.getGroupExpences(this.group._id).subscribe((res:any)=>{
     console.log(res);
     
     this.calculate(res)
   

    })

  }

  calculate(res){
    this.expense=[]
    this.total=0
    res.users.map((user:any,idx)=>{
      this.expense[idx]={
        name:user.name,
        share:0
      }
   
    })
    res.expenses.map((expense:any)=>{
    
      
      this.total = this.total+ expense.totalAmount ;
      expense.shares.map((share:any,idx)=>{
        let name=share.email.name
        this.expense.forEach((exp,index)=>{
          if(name===exp.name)
          {
            this.expense[index]={
              name:exp.name,
              share:this.expense[index].share+share.share,
              totals:0
            }
          }
        })
   //    console.log("share",share.share,"user",share.email.name);
        
      })
    })
    this.expense.map((user,idx)=>{
     
   console.log(user.share-((this.total)/this.expense.length));
     this.expense[idx].totals=user.share-((this.total)/this.expense.length)
  
     
    })
  }

  back(){
    this.router.navigate(['../viewgroup'])
  }
}
