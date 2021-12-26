import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from 'src/app/config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url: string;
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.url = apiConfigService.api_url;
  }

  getTaskPriorities(){
    return this.http.get(this.url + '/tasks.php?method=getTaskPriorities');
  }
  getTask(){

  }
  getSubTask(){

  }
  addTask(taskData){
    return this.http.post(this.url + '/tasks.php?method=addNewTask',taskData);
  }
  updateTask(updatedTaskData){
    return this.http.post(this.url + '/tasks.php?method=updateTask', updatedTaskData);
  }
  deleteTask(taskId){
    return this.http.post(this.url + '/tasks.php?method=updateTask', taskId);
  }
  addSubTask(subTaskData){
    return this.http.post(this.url + '/tasks.php?method=addSubTask',subTaskData);
  }
  updateSubTask(updatedSubTaskData){
    return this.http.post(this.url + '/tasks.php?method=updateSubTask', updatedSubTaskData);
  }
  deleteSubTask(subTaskId){
    return this.http.post(this.url + '/tasks.php?method=deleteSubTask', subTaskId);
  }
}

