import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  deleteflag=0
  group_ID:any=JSON.parse(localStorage.getItem('group'))._id
  groups:any=JSON.parse(localStorage.getItem('groups')) ||[]
  flag=1;
  email=localStorage.getItem('user') ;
  expenses:any= []
 
  constructor(private router:Router,
    private httpService:HttpService,
    private toaster:ToastController,
    private route :ActivatedRoute)
    {  
       this.groups.map(group=>{
         if(group.name===JSON.parse(localStorage.getItem('group')).name)
         { 
           this.expenses=group.expenses
         }
       })
      if(this.flag==1){
        this.flag=0;
        route.params.subscribe(value=>{ 
         this.getData()      
        })
      }
   }
  
getData(){
  this.httpService.getExpenses(this.group_ID).subscribe((res:any)=>{
  this.expenses=res
  }),err=>{
    
  }
}
   
  ngOnInit() {
    if(this.flag===1){
      this.getData()
     }
     this.flag=1;
    
  
    }
    deleteExpense(id,group){
    JSON.parse(localStorage.getItem('group')).users.map(user=>{
      if((user.role=="Admin" ) && (user.email===localStorage.getItem('user'))){
        let data={id:id,
          group:group,
          emails:(JSON.parse(localStorage.getItem('group'))).users}
        this.httpService.deleteExpense(data).subscribe(res=>{
          this.deleteflag=1;
          this.presentToast('Deleted successfully.',"success")
          this.getData()
  
        },err=>{
          this.presentToast('Oops..something went wrong',"danger")

        })
      }
      
    })
    
     if(this.deleteflag===0){
      this.presentToast('Oops..only Admin can delete',"danger")

     }
  }

 async presentToast(msg,color) {
      const toast = await this.toaster.create({
        message: msg,
        duration: 2000,
        position: 'top',
        color:color
        
      });
      toast.present();
    }
}
