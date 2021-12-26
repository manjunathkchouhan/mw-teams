import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from 'src/app/config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  url: string;
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.url = apiConfigService.api_url;
  }

  addProject(projectData){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }
    return this.http.post(this.url + '/projects.php?method=addNewProject', projectData);
  }
  getProjects(){
    return this.http.get(this.url + '/projects.php?method=getProjects');
  }
  updateProject(projectData){
    return this.http.post(this.url + '/projects.php?method=updateProject', projectData);
  }
  deleteProject(projectId){
    return this.http.post(this.url + '/projects.php?method=deleteProject', projectId);
  }
}
