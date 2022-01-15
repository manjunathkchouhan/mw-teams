import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubTaskComponent } from './add-sub-task/add-sub-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewTaskDetailComponent } from './view-task-detail/view-task-detail.component';
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
  },
  {
    path: 'view-task-detail',
    component: ViewTaskDetailComponent
  },
  {
    path: 'add-sub-task',
    component: AddSubTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
