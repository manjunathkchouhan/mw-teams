import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/api-services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private routes: Router,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required])
    });
  }

  submit() {
    // console.log(JSON.parse(this.loginForm.value));
    // let adminCred = {
    //   email: this.loginForm.value
    // }
    this.adminService.adminLogin(this.loginForm.value).subscribe((res:any) =>{

      console.log(res);
      if(res){
        this.routes.navigate(['/admin/dashboard']);
      }
    })
    // if(this.loginForm.get('username').value === 'admin@gmail.com' && this.loginForm.get('password').value === 'admin@123'){
    //   console.log(this.loginForm.value);
    //   this.routes.navigate(['/admin/dashboard']);
    // }else {
    // }
  }

}
