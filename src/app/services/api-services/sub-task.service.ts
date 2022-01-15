import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from 'src/app/config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {
  url: string;
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.url = apiConfigService.api_url;
  }

  addSubTask(subtaskData){
    return this.http.post(this.url + '/subtasks.php?method=addSubTask',subtaskData);
  }
  getSubTask(subtaskData){
    return this.http.post(this.url + '/subtasks.php?method=addSubTask',subtaskData);
  }
  getUsersForSubTask(){
    return this.http.get(this.url + '/subtasks.php?method=getUsersForSubTask');
  }
}
