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
  getUsers(){
    return this.http.get(this.url + '/users.php?method=getUsers');
  }
  updateUser(userData){
    return this.http.post(this.url + '/users.php?method=updateUser', userData);
  }
  deleteUser(userId){
    return this.http.post(this.url + '/users.php?method=deleteUser', userId);
  }
}
