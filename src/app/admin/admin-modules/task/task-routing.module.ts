import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-task',
    pathMatch: 'full'
  },
  {
    path: 'view-task',
    component:ViewTaskComponent
  },
  {
    path: 'add-task',
    component:AddTaskComponent
  },
  {
    path: 'edit-task',
    component:EditTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
