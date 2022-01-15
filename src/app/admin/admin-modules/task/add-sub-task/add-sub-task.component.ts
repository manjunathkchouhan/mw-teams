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
import { mimeType } from '../add-task/mime-type.validator';
import { SubTaskService } from 'src/app/services/api-services/sub-task.service';

@Component({
  selector: 'app-add-sub-task',
  templateUrl: './add-sub-task.component.html',
  styleUrls: ['./add-sub-task.component.scss'],
  providers: [ DatePipe ]
})
export class AddSubTaskComponent implements OnInit {
  allUsers;
  createSubTask: FormGroup;
  allProjects: any;
  taskPriorities: any;
  filteredUsers: Observable<string[]>;
  userOptions: string[] = [];
  myControl = new FormControl();
  intervals: any;
  weekDays: any;
  singleTask: any;
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private projectService: ProjectsService,
    private userService: UserService,
    private taskService: TaskService,
    private datePipe: DatePipe,
    private subTaskService:SubTaskService
  ) { }

  ngOnInit(): void {
    console.log(history.state.item);
    this.singleTask= history.state.item
    // if(history.state.item != undefined){
    //   this.singleTask= history.state.item
    // }else {
    //   this.routes.navigate(['/admin/tasks/view-task']);
    // }
    this.form();
    this.getAllPriorities();
    this.getAllUsers();
    this.getTaskInterval();
    this.getWeekDays();
  }

  form(){
    this.createSubTask = new FormGroup({
      task_id: new FormControl(""),
      sub_task_title: new FormControl("", [Validators.required]),
      user_id: new FormControl("",[Validators.required]),
      description: new FormControl(""),
      sub_task_priority: new FormControl("", [Validators.required]),
      start_date: new FormControl("", [Validators.required]),
      end_date: new FormControl("", [Validators.required]),
      task_interval: new FormControl(""),
      has_attachment: new FormControl(""),
      file_extension: new FormControl(""),
      file_name: new FormControl(""),
      base64_file: new FormControl(""),
      created_by: new FormControl(JSON.parse(localStorage.getItem('loggedId')))
    });
  }

  private userfilter(value1): string[] {
    const filterValue1 = value1.toLowerCase();
    return this.userOptions.filter(u => u.toLowerCase().includes(filterValue1));
  }
  getAllUsers(){
    this.subTaskService.getUsersForSubTask().subscribe((res:any) =>{
      if(res){
        this.allUsers = res;
        this.allUsers.forEach(element => {
              this.userOptions.push(element.first_name);
        });
        console.log(this.allUsers,this.userOptions);
        this.filteredUsers =  this.createSubTask.get('user_id')!.valueChanges.pipe(
          startWith(''),
          map(value1 => this.userfilter(value1)),
        );
      }
    })
  }
  getWeekDays(){
    this.taskService.getWeekDays().subscribe((res: any) =>{
      if(res){
        this.weekDays = res;
      }
    })
  }
  getAllPriorities(){
    this.taskService.getTaskPriorities().subscribe((res:any) =>{
      if(res){
        console.log(res);
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

  createSubTaskSubmit(){
    // console.log(this.createSubTask.value)
    if(this.createSubTask.value.has_attachment === true){
      this.createSubTask.value.has_attachment = "YES"
    }else {
      this.createSubTask.value.has_attachment = "NO"
    }
    this.createSubTask.value.start_date = this.datePipe.transform(this.createSubTask.value.start_date, 'yyyy-MM-dd');
    this.createSubTask.value.end_date = this.datePipe.transform(this.createSubTask.value.end_date, 'yyyy-MM-dd');
    this.createSubTask.value.user_id = JSON.stringify(this.createSubTask.value.user_id);
    this.createSubTask.value.task_id = this.singleTask.task_id;
    console.log(this.createSubTask.value);
    this.subTaskService.addSubTask(this.createSubTask.value).subscribe((res: any) =>{
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
    this.createSubTask.patchValue({ file_name: fileName });
    this.createSubTask.get('file_name')?.updateValueAndValidity();
    this.createSubTask.patchValue({ file_extension: "."+ ext });
    this.createSubTask.get('file_extension')?.updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      console.log(reader.result);
      let base64 = reader.result;
      this.createSubTask.patchValue({ base64_file: base64 });
      this.createSubTask.get('base64_file')?.updateValueAndValidity();
    };

    reader.readAsDataURL(file);
  }

  goBack(){
    this._location.back();
  }
}
