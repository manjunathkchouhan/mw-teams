import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/api-services/projects.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.scss']
})
export class EditProjectsComponent implements OnInit {
  editProjectForm: FormGroup;
  categoryData: any;
  constructor(
    public titleService: TitleService,
    public iconService: IconService,
    private _location: Location,
    private formBuilder: FormBuilder,
    private routes: Router,
    private projectService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.form();
    this.getData();
  }
  form() {
    this.editProjectForm = new FormGroup({
      project_title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      project_status: new FormControl("", [Validators.required]),
      active_status: new FormControl("", [Validators.required]),
      created_by: new FormControl(""),
      created_on: new FormControl(""),
      project_id: new FormControl("")
    });
  }
  getData() {
    if (history.state.data != undefined) {
      console.log(history.state.data);
      this.categoryData = history.state.data;
      this.setValue();
    } else {
      this.goBack();
    }
  }
  setValue() {
    this.editProjectForm.patchValue({
      project_title: this.categoryData.project_title,
      description: this.categoryData.description,
      project_status: this.categoryData.project_status,
      active_status: this.categoryData.active_status,
      created_by: this.categoryData.created_by,
      project_id: this.categoryData.project_id
    });
  }

  editedProjectFormSubmit(){
    console.log(this.editProjectForm.value);
    this.projectService.updateProject(this.editProjectForm.value).subscribe((res: any) =>{
      if(res){
        console.log(res);
        this.routes.navigate(['/admin/projects/view-projects']);
      }
    })
  }
  goBack() {
    this._location.back();
  }
}
