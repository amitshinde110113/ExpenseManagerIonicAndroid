import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpensesPage } from './group/expenses/expenses.page';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl='http://192.168.0.134:3000/';
  constructor(private http:HttpClient) { }

  checkMember(data){
    return this.http.post(this.baseUrl+'groups/checkuser',data)
  }
  createGroup(data){
    return this.http.post(this.baseUrl+'groups/create',data)
  }
  getGroups(data){
    return this.http.get(this.baseUrl+'groups/'+data)
  }
  createExpense(expenseData){
    return this.http.post(this.baseUrl+'expense/create',expenseData)
  }
  getExpenses(data)
  {
    return this.http.get(this.baseUrl+'expense/'+data)
  }
  deleteExpense(data){
    return this.http.post(this.baseUrl+'expense/delete',data)

  }
  deleteGroup(group){
    return this.http.post(this.baseUrl+'groups/delete',group)
  }
  getGroupExpences(data){
    return this.http.get(this.baseUrl+'groups/groupexpense/'+data)
  }
  getUser(email){
    return this.http.get(this.baseUrl+'users/'+email)

  }
  editGroup(group,name){
    return this.http.post(this.baseUrl+'groups/edit',{group:group,name:name})

  }
  getUsers(IdArray){
    return this.http.post(this.baseUrl+'users/getusers',{IdArray:IdArray})
  
  }
}
