import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/api-services/projects.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  isLoading = false;
  searchString2;
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
        option: "Project Name",
        value: "Project Name"
      }];

      this.getAllProjects();
  }
  pagination(event) {
    this.p = event;
    this.getAllProjects();
  }
  goBack(){
    this._location.back();
  }
getAllProjects(){
  this.isLoading = true;
  this.projectService.getProjects().subscribe((res:any) =>{
    this.isLoading = false;
    if(res){
      this.allProjects = res;
      console.log(this.allProjects);
    }
  })
}


  editProjects(item){
    this.routes.navigate(['/admin/projects/edit-projects'],  {state:{data: item}});
  }
  deleteProject(item){
    this.isLoading = true;
    let project = {
      project_id: item.project_id
    }
    this.projectService.deleteProject(project).subscribe((res:any) =>{
      this.isLoading = false;
      if(res){
        this.getAllProjects();
      }
    })
  }
  filterByValidation(filterBy) {
    if (filterBy === undefined) {
      // this.toastr.error('Enter filter value to search');
    }
  }
}
