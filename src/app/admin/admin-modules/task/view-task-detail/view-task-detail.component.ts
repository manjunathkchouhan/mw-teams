import { Component, Inject, OnInit } from '@angular/core';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {DatePipe, Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { TaskService } from 'src/app/services/api-services/task.service';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-task-detail',
  templateUrl: './view-task-detail.component.html',
  styleUrls: ['./view-task-detail.component.scss']
})
export class ViewTaskDetailComponent implements OnInit {
  singleTask: any;

  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private taskService: TaskService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(history.state.item);
    if(history.state.item != undefined){
      this.singleTask= history.state.item
      this.getTaskDetrails()
    }else {
      this.routes.navigate(['/admin/tasks/view-task']);
    }
  }

  goBack(){
    this._location.back();
  }
  getTaskDetrails(){
   let task = {
        task_id: this.singleTask.task_id
    }
    console.log(task);
    this.taskService.getTaskDetails(task).subscribe((res: any)=>{
      console.log(res);
      if(res){
        this.singleTask = res;
      }
    })
  }
  openDialog(){
    console.log("user cliked");
    const dialogRef = this.dialog.open(ViewUsersDailog, {
      width: '250px',
      data: {users: this.singleTask.task_users},
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-view-users-dailog',
  templateUrl: 'view-users.dailog.html',
})
export class ViewUsersDailog implements OnInit {
  userList;
  constructor(
    public dialogRef: MatDialogRef<ViewUsersDailog>,
    @Inject(MAT_DIALOG_DATA) public users,
  ) {}
  ngOnInit(): void {
    console.log(this.users.users);
    this.userList =  this.users.users;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
