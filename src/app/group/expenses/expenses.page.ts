import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { ToastController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {
  
  group_ID:any=JSON.parse(localStorage.getItem('group'))._id
  flag=1;
  email=localStorage.getItem('user') ;
  expenses:any=[]
  constructor(private router:Router,
    private httpService:HttpService,
    private toaster:ToastController,
    private route :ActivatedRoute)
    {
      if(this.flag==1){
        this.flag=0;
        route.params.subscribe(value=>{
       
          this.getData()
          
        })
      }
       
   
   }
  
getData(){
  this.httpService.getExpenses(this.group_ID).subscribe((res:any)=>{
    console.log(res);
  this.expenses=res
  })
}
   
  ngOnInit() {
    if(this.flag===1){
      this.getData()
     }
     this.flag=1;
    
  
    }
    deleteExpense(id,group){
    //console.log(id,group);
      let data={id:id,
        group:group,
        emails:(JSON.parse(localStorage.getItem('group'))).users}
      this.httpService.deleteExpense(data).subscribe(res=>{
        console.log(res);
        
        this.presentToast()
        this.getData()

      })
     
  }

 async presentToast() {
      const toast = await this.toaster.create({
        message: 'Deleted successfully.',
        duration: 2000,
        position: 'top',
        color:'success'
      });
      toast.present();
    }
}
