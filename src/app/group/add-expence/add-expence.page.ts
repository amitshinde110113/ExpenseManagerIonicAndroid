import { Component,NgZone , OnInit, ɵsetClassMetadata } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-add-expence',
  templateUrl: './add-expence.page.html',
  styleUrls: ['./add-expence.page.scss'],
})


export class AddExpencePage implements OnInit {
  mySelect:any;isCustom=false;expenseDetails:any;userForm:FormGroup; data:any
  users:any=JSON.parse(localStorage.getItem('group')).users;curentuser:any=[]
  group_ID:any=JSON.parse(localStorage.getItem('group'))._id
  constructor(private route:ActivatedRoute,
    private ngZone:NgZone,
    private fb:FormBuilder,
    private toaster:ToastController,
    private router:Router,
    private httpService:HttpService,
    private alertController: AlertController) { 
    this.users=JSON.parse(localStorage.getItem('group')).users
  }
  alertIpute:any=[]
  ngOnInit() {
   let storageUser=localStorage.getItem('user')
   console.log("fromstorage",storageUser);
    // this.users.map(user=>{
    //   this.alertIpute.push({
    //     label: user.name,
    //     name: user.name,
    //     type: 'text',
    //     placeholder: 'Enter share of '+ user.name})
    // })
  
  this.users.map(user=>{
      if(storageUser===user.email){
 
        this.curentuser[0]=user;
        
      }
    })

    this.userForm=this.fb.group({
      amount:['',[Validators.required,Validators.min(1)]],
      description:['',Validators.required,],
      custom:new FormArray([],),
    })
    this.userForm.valueChanges.subscribe(data=>{
      this.showSelectValue(this.mySelect)
    })
  }
  showSelectValue(mySelect)
  {this.mySelect=mySelect
    this.expenseDetails=""
   
    if(mySelect==='individual')
    {
      this.isCustom=false;
      let shares:any=[];
      shares.push(this.curentuser.map((user,idx)=>{
        return{
          email:user,
          share:(this.userForm.get('amount').value)
        }
        // shares[idx].email=user,
        // shares[idx].share=(this.userForm.get('amount').value)/(this.users.length)
      })) 
      this.data={
        user:shares,
        amount:this.userForm.get('amount').value,
        description:this.userForm.get('description').value,
        
      }
      this.expenseDetails=this.data
      
      
    }
    else if(mySelect==='equal')
    { 
      this.isCustom=false;
      let shares:any=[];
      shares.push(this.users.map((user,idx)=>{
        return{
          email:user,
          share:(this.userForm.get('amount').value)/(this.users.length)
        }
        // shares[idx].email=user,
        // shares[idx].share=(this.userForm.get('amount').value)/(this.users.length)
      })) 
      this.data={
        user:shares,
        amount:(this.userForm.get('amount').value)/(this.users.length),
        description:this.userForm.get('description').value
      }
      this.expenseDetails=this.data
    }
    else if(mySelect==="custom"){
     
      this.isCustom=true;
    
      this.alertIpute=[]
     // console.log(mySelect, this.expenseDetails);
     
      
    }
   
    
  }
  showSelectedUserValue(userArray,event)
   { console.log(userArray);
    userArray.map(user=>{
      this.alertIpute.push({
        label: user.name,
        name: user.name,
        type: 'number',
        placeholder: 'Enter share of '+ user.name})
    })
     this.expenseDetails=[]
    
   if(userArray.length>0)
   { 
    this.myAlert_show(userArray)
    let shares:any=[];
   console.log(userArray);
    
     shares.push(userArray.map((user,idx)=>{
      return{
        email:user,
        share:(this.userForm.get('amount').value)/(userArray.length)
      }
     }))
   
    this.data={
      user:shares,
      amount:(this.userForm.get('amount').value)/(userArray.length),
      description:this.userForm.get('description').value,
      }
    console.log("data from select",this.data);
    
    
    }
    //console.log(event);
    this.alertIpute=[]
   // this.expenseDetails=this.data
    // console.log(this.expenseDetails);
    
  }
  addExpence()
  { 
    try{ 
      if(this.data.user.length>0 && this.userForm.valid){
      //  console.log(this.userForm);
      let expenseData={
        description:this.expenseDetails.description,
        totalAmount:this.userForm.get('amount').value,
        shares:this.expenseDetails.user[0],
        group:(JSON.parse(localStorage.getItem('group')))._id,
        time:new Date()

      }
          console.log(expenseData,'**',);
      
      this.httpService.createExpense(expenseData).subscribe(res=>{
        console.log("response ===>",res);
      
      
   this.router.navigate(['../viewgroup/expences'])
  // this.router.navigate(['../viewgroup/expences']).then(() => window.location.reload());
  
      })
      }
      else{
        this.presentToast( 'Expence amount and description required')
      }
    }catch(e){
      this.presentToast('Please select contributors')
    }
   
  }

  backTogroup(){
    
    this.router.navigate(['../viewgroup'])
  }


  ////////////////////////ALERT///////////////////////////
  async presentToast(msg) {
    const toast = await this.toaster.create({
      position:'middle',
      color:'danger',
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  async myAlert_show(userArray) {
    const myAlert = await this.alertController.create({
      header: 'Add Taks',
      message: '',
      buttons: [
        { 
          text: 'OK',
          handler: data => {
            let amt=0;
          //  console.log(data,userArray);
          // console.log( Object.keys(data));
          Object.keys(data).map(usr=>{
           amt=amt+parseInt( data[''+usr])
          })
           if(this.userForm.get('amount').value===amt)
           {
              console.log("/////////////////////////////////////////////////////////");
              let shares:any=[];
           userArray.map((user,idx)=>{
           
            Object.keys(data).map(usr=>{
                //console.log(data.JSON.parse(usr),usr);

              if(user.name===usr )
              { console.log("test",data[''+usr],user);
              
              shares.push({
                  email:user,
                  share:parseInt( data[''+usr])
                })
              }
              
            })
              
            })
        //  console.log("share",shares);
          
           this.data={
             user:[shares],
            amount:(this.userForm.get('amount').value)/(userArray.length),
             description:this.userForm.get('description').value,
             }
            console.log("data from alert",this.data);

            this.expenseDetails=this.data
           //  console.log("Expense",this.expenseDetails);
       
           }else{
             
            this.presentToast("Total amount and shares must equal")
           }
           
            
          },

        },
        {
          text: 'Cancel',
          role: "cancel",
          handler: data => {
            //console.log('Abbrechen clicked. Data -> ' + JSON.stringify(data));
          },

        }
      ],
      inputs: this.alertIpute
     
    });
    await myAlert.present();
  }
}
