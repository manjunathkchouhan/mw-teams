import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/api-services/projects.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
  createProject: FormGroup;
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.form();
  }

  form(){
    this.createProject = new FormGroup({
      project_title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      project_status: new FormControl("", [Validators.required]),
      active_status: new FormControl("", [Validators.required]),
      created_by: new FormControl("1"),
    });
  }

  createProjectSubmit(){
    this.projectService.addProject(this.createProject.value).subscribe((res: any) =>{
      if(res){
        this.routes.navigate(['/admin/projects/view-projects']);
      }
    })
  }

  goBack(){
    this._location.back();
  }
}
