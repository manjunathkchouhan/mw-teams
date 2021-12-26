import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/api-services/admin.service';
import { UserService } from 'src/app/services/api-services/user.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  editUserForm: FormGroup;
  userData: any;
  activeStatus;
  roles;
  constructor(
    public titleService: TitleService,
    public iconService: IconService,
    private _location: Location,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private routes: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.form();
    this.getUserRoles();
  }
  form() {
    this.editUserForm = new FormGroup({
      first_name: new FormControl("", [Validators.required]),
      last_name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone_no: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      role_id: new FormControl("", [Validators.required]),
      active_status: new FormControl("", [Validators.required]),
      login_status: new FormControl(""),
      fcm_token: new FormControl(""),
      device_id: new FormControl(""),
      created_by: new FormControl("1"),
      created_on: new FormControl(""),
      modified_by: new FormControl(""),
      modified_on: new FormControl(""),
      user_id: new FormControl("")
    });
  }
  getData() {
    if (history.state.data != undefined) {
      console.log(history.state.data);
      this.userData = history.state.data;
      this.setValue();
    } else {
      this.goBack();
    }
  }
  setValue() {
    let roles = this.roles.filter(role => role.role_id  === this.userData.role_id);
    // let activeStatus = this.activeStatus(active => active)
    this.editUserForm.patchValue({
      first_name: this.userData.first_name,
      last_name: this.userData.last_name,
      email: this.userData.email,
      phone_no: this.userData.phone_no,
      password: this.userData.password,
      role_id: roles[0].role_name,
      active_status: this.userData.active_status,
      login_status: this.userData.login_status,
      fcm_token: this.userData.fcm_token,
      device_id: this.userData.device_id,
      created_by: this.userData.created_by,
      created_on: this.userData.created_on,
      modified_by: this.userData.modified_by,
      modified_on:this.userData.modified_on,
      user_id: this.userData.user_id
    });
  }

  editedUserFormSubmit(){
    // console.log(this.editUserForm.value);
    let role = this.roles.filter(role => role.role_name === this.editUserForm.value.role_id);
    this.editUserForm.value.role_id = role[0].role_id;
    console.log(this.editUserForm.value);
    this.userService.updateUser(this.editUserForm.value).subscribe((res: any) =>{
      console.log(res);
      if(res){
        console.log(res);
        this.routes.navigate(['/admin/users/view-users']);
      }
    })
  }
  goBack() {
    this._location.back();
  }

  getUserRoles(){
    this.adminService.getRoles().subscribe((res: any) =>{
      if(res){
        console.log(res);
        this.roles = res;
        this.getActiveStatus();
      }
    })
  }
  getActiveStatus(){
    this.adminService.getActiveStatus().subscribe((res: any) =>{
      if(res){
        console.log(res);
        this.activeStatus = res;
        this.getData();
      }
    })
  }
}
