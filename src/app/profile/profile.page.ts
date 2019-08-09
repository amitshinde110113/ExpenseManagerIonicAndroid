import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ImagesService } from '../images.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
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
    private httpService:HttpService,
    private route:ActivatedRoute,
    private nativeStorage:NativeStorage) { 

  

  console.log(this.url);
  
    if(this.flag === 1)
    { 
    
      this.flag = 0;
      route.params.subscribe(data=>{
        this.expense={
          name:'',
          share:0
        }
       // this.url=""
        this.email=localStorage.getItem('user');
     //   console.log(data);
        
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
 // console.log(this.email);
  
  this.httpService.getUser(this.email).subscribe(res=>{
    this.user=res;
    localStorage.setItem('userDetails',JSON.stringify(res))
    this.nativeStorage.setItem('myData',{userDetails :JSON.stringify(res)})
    console.log("--------------",res);
    console.log(this.url);
    // this.url="http://192.168.0.134:3000/"+this.user.profiePic
    
      this.url= "https://expensemanager110113.herokuapp.com/"+this.user.profiePic
   this.imageService.getBase64ImageFromURL(this.url).subscribe(base64data=>{
     console.log(base64data);
     
    localStorage.setItem("profile",base64data)
   }) 
  //  this.url="175.100.138.135:3000/"+this.user.profiePic

    //console.log(this.user.profiePic);
    this.calculateExpense(res)

  },err=>{this.calculateExpense(this.user)})
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
   //console.log(this.expense);
   
}
}
