import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/api-services/admin.service';
import { UserService } from 'src/app/services/api-services/user.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  addUserForm: FormGroup;
  roles;
  activeStatus;
  isLoading =  false;
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private userService: UserService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.form();
    this.getUserRoles();
    this.getActiveStatus();
  }

  form(){
    this.addUserForm = new FormGroup({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.email]),
      phone_no: new FormControl("", [Validators.required,Validators.minLength(10),Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      password: new FormControl("", [Validators.required]),
      role_id: new FormControl("", [Validators.required]),
      active_status: new FormControl("", [Validators.required]),
      login_status: new FormControl(""),
      fcm_token: new FormControl(""),
      device_id: new FormControl(""),
      created_by: new FormControl("1")
    });
  }

  addUserFormSubmit(){
    this.isLoading = true;
    let role = this.roles.filter(role => role.role_name === this.addUserForm.value.role_id);
    this.addUserForm.value.role_id = role[0].role_id;
    this.userService.addUser(this.addUserForm.value).subscribe((res: any) =>{
      this.isLoading = false;
      console.log(res);
      if(res){
        this.routes.navigate(['/admin/users/view-users']);
      }
    })
  }

  goBack(){
    this._location.back();
  }
  getUserRoles(){
    this.adminService.getRoles().subscribe((res: any) =>{
      if(res){
        console.log(res);
        this.roles = res;
      }
    })
  }
  getActiveStatus(){
    this.adminService.getActiveStatus().subscribe((res: any) =>{
      if(res){
        console.log(res);
        this.activeStatus = res;
      }
    })
  }
}
