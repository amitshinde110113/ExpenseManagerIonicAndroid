import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  group:any=JSON.parse(localStorage.getItem('group'))
    
  constructor(private router:Router,private ngZone:NgZone) { 
    
  }

  ngOnInit() {
    
    this.ngZone.run(() => {
      this.router.navigate(['./viewgroup/expences'],);
    });
   

  }

}
