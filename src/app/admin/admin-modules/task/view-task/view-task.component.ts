import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/api-services/projects.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DatePipe, Location} from '@angular/common';
import { TaskService } from 'src/app/services/api-services/task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  allProjects = [];
  // = [
  //   { project_title: 'MW Team App', description:"Task tracking app", project_status: "Development in progress", active_status: "Development", created_by: "1"},
  //   { project_title: 'MW Team App1', description:"Task tracking app", project_status: "Development in progress", active_status: "Development", created_by: "1"},
  //   { project_title: 'MW Team App2', description:"Task tracking app", project_status: "Development in progress", active_status: "Development", created_by: "1"},
  // ];
  p: number = 1;
  filterNames: any = [];
  allTasks;
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private projectService: ProjectsService,
    public dialog: MatDialog,
    private taskService: TaskService
  ) {

   }

  ngOnInit(): void {
    this.filterNames = [
      {
        option: "Name",
        value: "Name"
      },
      {
        option: "Type",
        value: "Type"
      }
    ]
    this.getAllTasks();
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


  editProjects(){
    // this.routes.navigate(['/admin/projects/edit-projects'],  {state:{data: item}});
  }
  deleteProject(){
    console.log("data")
    // let project = {
    //   project_id: item.project_id
    // }
    // this.projectService.deleteProject(project).subscribe((res:any) =>{
    //   if(res){
    //     this.getAllProjects();
    //   }
    // })
  }

  getAllTasks(){
    console.log("colling from ngonit");
    let logUser = JSON.parse(localStorage.getItem('loggedUser'))
    const user = {
      user_id: JSON.parse(localStorage.getItem('loggedId')),
      role_id: logUser.role_id
    }
    console.log(user);
    this.taskService.getAllTasks(user).subscribe((res =>{
      console.log(res);
      if(res){
        this.allTasks = res;
      }
    }))
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddsubTaskDailog, {
      width: '999px',
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-add-sub-task-dailog',
  templateUrl: 'add-sub-task-dailog.html',
})
export class AddsubTaskDailog implements OnInit {
  createSubTask: FormGroup;
  allUsers: any;
  taskPriorities: any;
  intervals: any;
  constructor(
    public dialogRef: MatDialogRef<AddsubTaskDailog>,
    private taskService: TaskService

    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}
  ngOnInit(): void {
    this.form();
    this.getAllPriorities();
    this.getAllUsers();
    this.getTaskInterval();

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  form(){
    this.createSubTask = new FormGroup({
      task_id: new FormControl(""),
      sub_task_title: new FormControl(""),
      description: new FormControl(""),
      sub_task_priority: new FormControl(""),
      start_date: new FormControl("", [Validators.required]),
      end_date: new FormControl("", [Validators.required]),
      task_interval: new FormControl("", [Validators.required]),
      interval_expression: new FormControl(""),
      task_status: new FormControl(""),
      has_attachment: new FormControl(""),
      task_completion: new FormControl(""),
      attachment_type: new FormControl("No"),
      source_location: new FormControl("0"),
      created_by: new FormControl(JSON.parse(localStorage.getItem('loggedId')))
    });
  }
  addSubTask(){
    console.log("added sub task",  this.createSubTask.value);
  }
  getAllUsers(){
    this.taskService.getUsers().subscribe((res:any) =>{
      if(res){
        this.allUsers = res;
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
}
