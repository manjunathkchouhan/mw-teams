import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from 'src/app/config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url: string;
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.url = apiConfigService.api_url;
  }


  adminLogin(data){
    console.log("adminLogin:", data);
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }
    return this.http.post(this.url + '/admin_login.php?method=submitLogin', data);
  }

  getRoles(){
    return this.http.get(this.url + '/roles.php?method=getRoles');
  }

  getActiveStatus(){
    return this.http.get(this.url + '/roles.php?method=getActiveStatus');
  }
}
