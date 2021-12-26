import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/api-services/projects.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit {
  allProjects = [];
  // = [
  //   { project_title: 'MW Team App', description:"Task tracking app", project_status: "Development in progress", active_status: "Development", created_by: "1"},
  //   { project_title: 'MW Team App1', description:"Task tracking app", project_status: "Development in progress", active_status: "Development", created_by: "1"},
  //   { project_title: 'MW Team App2', description:"Task tracking app", project_status: "Development in progress", active_status: "Development", created_by: "1"},
  // ];
  p: number = 1;
  filterNames: any = [];
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.filterNames = [
      {
        option: "Name",
        value: "Name"
      },
      {
        option: "Type",
        value: "Type"
      },
      {
        option: "Bond_id",
        value: "Bond_id"
      }];

      this.getAllProjects();
  }
  pagination(event) {
    this.p = event;
  }
  goBack(){
    this._location.back();
  }
getAllProjects(){
  this.projectService.getProjects().subscribe((res:any) =>{
    if(res){
      this.allProjects = res;
    }
  })
}


  editProjects(item){
    this.routes.navigate(['/admin/projects/edit-projects'],  {state:{data: item}});
  }
  deleteProject(item){
    let project = {
      project_id: item.project_id
    }
    this.projectService.deleteProject(project).subscribe((res:any) =>{
      if(res){
        this.getAllProjects();
      }
    })
  }
}
