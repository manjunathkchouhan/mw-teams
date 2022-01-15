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
  isLoading = false;
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

    console.log("click");
    // let adminCred = {
    //   email: this.loginForm.value
    // }
    this.isLoading = true;
    this.adminService.adminLogin(this.loginForm.value).subscribe((res:any) =>{
      console.log(res);
      this.isLoading = false;
      if(res.status && res.status.toLowerCase() === 'failed'){
        console.log(res.message);
      }else {
        localStorage.setItem('loggedId', JSON.stringify(res.user_id));
        localStorage.setItem('loggedUser', JSON.stringify(res));
        this.routes.navigate(['/admin/dashboard']);
      }
    })
    // if(this.loginForm.get('username').value === 'admin@gmail.com' && this.loginForm.get('password').value === 'admin@123'){
    //   console.log(this.loginForm.value);
    //   this.routes.navigate(['/admin/dashboard']);
    // }else {
    // }

    // task "user_id": [{"id": '2'},{"id": '3'},{"id": '14'}]
    //user_id: "[\"20\",\"21\"]"
  }

}
