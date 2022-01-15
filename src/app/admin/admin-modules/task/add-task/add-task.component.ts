import { Component, Input, OnInit } from '@angular/core';
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
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  providers: [ DatePipe ]
})
export class AddTaskComponent implements OnInit {
  allUsers;
  createTask: FormGroup;
  allProjects;
  taskPriorities: any;
  filteredOptions;
  filteredUsers: Observable<string[]>;
  projectsOptions: string[] = [];
  userOptions: string[] = [];
  myControl = new FormControl();
  intervals: any;
  weekDays: any;
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
    this.getAllProjects();
    this.getAllPriorities();
    this.getAllUsers();
    this.getTaskInterval();
  }

  form(){
    this.createTask = new FormGroup({
      task_title: new FormControl("", [Validators.required]),
      category_id: new FormControl(""),
      user_id: new FormControl("",[Validators.required]),
      project_id: new FormControl("",[Validators.required]),
      description: new FormControl(""),
      task_priority: new FormControl("", [Validators.required]),
      start_date: new FormControl("", [Validators.required]),
      end_date: new FormControl("", [Validators.required]),
      task_interval: new FormControl(""),
      has_attachment: new FormControl(""),
      file_extension: new FormControl(""),
      file_name: new FormControl(""),
      base64_file: new FormControl(""),
      created_by: new FormControl(JSON.parse(localStorage.getItem('loggedId'))),
    });

    this.createTask.get('project_id').valueChanges.subscribe(response => {
      console.log('data is ', response);
      this.filterData(response);
    })
  }
  filterData(enteredData){
    console.log(enteredData);
    this.filteredOptions = this.allProjects.filter(item => {
      return item.project_title.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }
  private _filter(value): string[] {
    const filterValue = value.toLowerCase();
    return this.projectsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  private userfilter(value1): string[] {
    const filterValue1 = value1.toLowerCase();
    return this.userOptions.filter(u => u.toLowerCase().includes(filterValue1));
  }

  getAllProjects(){
    this.taskService.getProjectsTask().subscribe((res:any) =>{
      console.log(res);
      if(res){
        this.allProjects = res;
        this.filteredOptions = res;
        // this.allProjects.forEach(element => {
        //       this.projectsOptions.push(element.project_title);
        // });
        // // console.log(this.allProjects,this.allProjects);
        // this.filteredOptions =  this.createTask.get('project_id')!.valueChanges.pipe(
        //   startWith(''),
        //   map(value => this._filter(value)),
        // );
      }
    })
  }
  getAllUsers(){
    this.taskService.getUsers().subscribe((res:any) =>{
      console.log(res);
      if(res){
        this.allUsers = res;
        this.allUsers.forEach(element => {
              this.userOptions.push(element.first_name);
        });
        // console.log(this.allUsers,this.userOptions);
        this.filteredUsers =  this.createTask.get('user_id')!.valueChanges.pipe(
          startWith(''),
          map(value1 => this.userfilter(value1)),
        );
      }
    })
  }
  getAllPriorities(){
    this.taskService.getTaskPriorities().subscribe((res:any) =>{
      if(res){
        this.taskPriorities = res;
      }
    })
  }
  getTaskInterval(){
    this.taskService.getTaskIntervals().subscribe((res: any) =>{
      if(res){
        this.intervals = res;
        console.log(this.intervals);
      }
    })
  }

  createTaskSubmit(){
    // console.log(this.createTask.value)
    if(this.createTask.value.has_attachment === true){
      this.createTask.value.has_attachment = "YES"
    }else {
      this.createTask.value.has_attachment = "NO"
    }
    this.createTask.value.start_date = this.datePipe.transform(this.createTask.value.start_date, 'yyyy-MM-dd');
    this.createTask.value.end_date = this.datePipe.transform(this.createTask.value.end_date, 'yyyy-MM-dd');
    this.allProjects.filter(p =>{
      if(p.project_title === this.createTask.value.project_id){
        this.createTask.value.project_id = p.project_id;
        this.createTask.value.category_id = p.category_id;
      }
    });
    this.createTask.value.user_id = JSON.stringify(this.createTask.value.user_id);
    console.log(this.createTask.value);
    this.taskService.addTask(this.createTask.value).subscribe((res: any) =>{
      console.log(res)
      if(res){
        this.routes.navigate(['/admin/tasks/view-task']);
      }
    })
  }
  onImagePicked(event: any) {
    //  console.log(event.target.files);
    // file_name
    const file = event.target.files[0];

    const name = event.target.files[0].name;
    const lastDot = name.lastIndexOf('.');

    const fileName = name.substring(0, lastDot);
    const ext = name.substring(lastDot + 1);
    this.createTask.patchValue({ file_name: fileName });
    this.createTask.get('file_name')?.updateValueAndValidity();
    this.createTask.patchValue({ file_extension: "."+ ext });
    this.createTask.get('file_extension')?.updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      console.log(reader.result);
      let base64 = reader.result;
      this.createTask.patchValue({ base64_file: base64 });
      this.createTask.get('base64_file')?.updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  }

  goBack(){
    this._location.back();
  }
}
