import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectFilterPipe } from 'src/app/pipe/project-filter.pipe';


@NgModule({
  declarations: [
    AddProjectsComponent,
    ViewProjectsComponent,
    EditProjectsComponent,
    ProjectFilterPipe
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxPaginationModule
  ]
})
export class ProjectsModule { }
