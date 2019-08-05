import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  group:any=JSON.parse(localStorage.getItem('group'))
  constructor() { }

  ngOnInit() {
  }

}
