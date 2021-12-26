import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/api-services/user.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  allUsers = [];
  // = [
  //   { first_name: 'User', last_name:"Name", email:"username@gmail.com", phone_no: "9999999999", password: "username#123",role_id:"4", active_status:"Active", login_status:"CREATED",device_id:"fcm_token",created_by:"1"},
  //   { first_name: 'User1', last_name:"Name1", email:"username1@gmail.com", phone_no: "9999999999", password: "username#123",role_id:"4", active_status:"Active", login_status:"CREATED",device_id:"fcm_token",created_by:"1"},
  //   { first_name: 'User2', last_name:"Name2", email:"username2@gmail.com", phone_no: "9999999999", password: "username#123",role_id:"4", active_status:"Active", login_status:"CREATED",device_id:"fcm_token",created_by:"1"},
  // ];
  p: number = 1;
  filterNames: any = [];
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.filterNames = [
      {
        option: "Name",
        value: "Name"
      },
      {
        option: "Type",
        value: "Type"
      },
      {
        option: "Bond_id",
        value: "Bond_id"
      }];
      this.getAllUsers();
  }
  getAllUsers(){
    this.userService.getUsers().subscribe((res:any) =>{
      if(res){
        this.allUsers = res;
      }
    })
  }
  pagination(event) {
    this.p = event;
  }
  goBack(){
    this._location.back();
  }

  editUsers(item){
    this.routes.navigate(['/admin/users/edit-users'],  {state:{data: item}});
  }
  deleteUser(item){
    console.log(item);
    let user = {
      user_id: item.user_id
    }
    this.userService.deleteUser(user).subscribe((res:any) =>{
      if(res){
        this.getAllUsers();
      }
    })
  }
}
