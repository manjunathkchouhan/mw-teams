import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { ViewTaskComponent,AddsubTaskDailog } from './view-task/view-task.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { ViewTaskDetailComponent,ViewUsersDailog } from './view-task-detail/view-task-detail.component';
import { AddSubTaskComponent } from './add-sub-task/add-sub-task.component';




@NgModule({
  declarations: [
    ViewTaskComponent,
    AddsubTaskDailog,
    AddTaskComponent,
    EditTaskComponent,
    ViewTaskDetailComponent,
    ViewUsersDailog,
    AddSubTaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxMatSelectSearchModule,
    NgxMatTimepickerModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class TaskModule { }
