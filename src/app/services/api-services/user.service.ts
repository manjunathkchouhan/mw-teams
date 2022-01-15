import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from 'src/app/config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.url = apiConfigService.api_url;
  }

  addUser(userData){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }
    return this.http.post(this.url + '/users.php?method=addNewUser', userData);
  }
  getUsers(user){
    // console.log(user);
    return this.http.post(this.url + '/users.php?method=getUsersList', user);
  }
  updateUser(userData){
    return this.http.post(this.url + '/users.php?method=updateUser', userData);
  }
  deleteUser(userId){
    return this.http.post(this.url + '/users.php?method=deleteUser', userId);
  }
}
