import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/api-services/projects.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {DatePipe, Location} from '@angular/common';
import { UserService } from 'src/app/services/api-services/user.service';
import { TaskService } from 'src/app/services/api-services/task.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  allUsers;
  createTask: FormGroup;
  allProjects: any;
  taskPriorities: any;
  filteredOptions: Observable<string[]>;
  projectsOptions: string[] = [];
  myControl = new FormControl();
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private projectService: ProjectsService,
    private userService: UserService,
    private taskService: TaskService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.form();
    this.getAllUsers();
    this.getAllProjects();
    this.getAllPriorities();
  }

  form(){
    this.createTask = new FormGroup({
      task_title: new FormControl("", [Validators.required]),
      category_id: new FormControl("1"),
      project_id: new FormControl(""),
      description: new FormControl("", [Validators.required]),
      task_priority: new FormControl("", [Validators.required]),
      start_date: new FormControl("", [Validators.required]),
      end_date: new FormControl("", [Validators.required]),
      task_interval: new FormControl(""),
      interval_expression: new FormControl(""),
      task_status: new FormControl(""),
      has_attachment: new FormControl("No"),
      task_completion: new FormControl("0"),
      attachment_type: new FormControl(""),
      source_location: new FormControl(""),
      created_by: new FormControl("1"),
    });
  }
  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.projectsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAllUsers(){
    this.userService.getUsers().subscribe((res:any) =>{
      if(res){
        this.allUsers = res;
      }
    })
  }
  getAllProjects(){
    this.projectService.getProjects().subscribe((res:any) =>{
      if(res){
        this.allProjects = res;
        this.allProjects.forEach(element => {
              this.projectsOptions.push(element.project_title);
        });
        this.filteredOptions =  this.createTask.get('project_id')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
      }
    })
  }
  getAllPriorities(){
    this.taskService.getTaskPriorities().subscribe((res:any) =>{
      if(res){
        this.taskPriorities = res;
        console.log(this.taskPriorities);
      }
    })
  }

  createTaskSubmit(){
    console.log(this.createTask.value)
    this.createTask.value.start_date = this.datePipe.transform(this.createTask.value.start_date, 'yyyy-MM-dd');
    this.createTask.value.end_date = this.datePipe.transform(this.createTask.value.end_date, 'yyyy-MM-dd');
    let projects = this.allProjects.filter(p => p.project_title === this.createTask.value.project_id);
    this.createTask.value.project_id = projects[0].project_id;
    console.log(this.createTask.value)
    this.taskService.addTask(this.createTask.value).subscribe((res: any) =>{
      console.log(res)
      if(res){
        this.routes.navigate(['/admin/projects/view-projects']);
      }
    })
  }

  goBack(){
    this._location.back();
  }
}
