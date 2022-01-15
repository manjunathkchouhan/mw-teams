import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/api-services/projects.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {Location} from '@angular/common';
import { CategoryService } from 'src/app/services/api-services/category.service';
import { AdminService } from 'src/app/services/api-services/admin.service';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.scss']
})
export class AddProjectsComponent implements OnInit {
  createProject: FormGroup;
  allCategories: any;
  isLoading = false;
  projectStatus: any;
  status: any;
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private projectService: ProjectsService,
    private categoryService: CategoryService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.form();
    this.getCategory();
    this.getProjects();
    this.getActiveStatus();
  }

  form(){
    this.createProject = new FormGroup({
      project_title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      project_status: new FormControl("", [Validators.required]),
      active_status: new FormControl("", [Validators.required]),
      created_by: new FormControl(JSON.parse(localStorage.getItem('loggedId'))),
      category_id:new FormControl("")
    });
  }

  createProjectSubmit(){
    this.isLoading = true;
    let category = this.allCategories.filter(c => c.category === this.createProject.value.category_id);
    this.createProject.value.category_id = category[0].category_id;
    console.log(this.createProject.value);
    this.projectService.addProject(this.createProject.value).subscribe((res: any) =>{
      this.isLoading = false;
      console.log(res);
      if(res){
        this.routes.navigate(['/admin/projects/view-projects']);
      }
    })
  }
  getCategory(){
    this.categoryService.getCategory().subscribe((res:any) =>{
      if(res){
        this.allCategories = res;
      }
    })
  }
  getProjects(){
    this.projectService.getProjectStatus().subscribe((res:any)=>{
      // console.log(res);
        if(res){
          // console.log(res);
          this.projectStatus = res;
        }
    })
  }
  getActiveStatus(){
    this.adminService.getActiveStatus().subscribe((res: any)=>{
      console.log(res);
      if(res){
        this.status = res;
      }
    })
  }
  goBack(){
    this._location.back();
  }
}
