import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCategoryComponent } from '../category/view-category/view-category.component';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { ViewProjectsComponent } from './view-projects/view-projects.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-projects',
    pathMatch: 'full'
  },
  {
    path: 'view-projects',
    component:ViewProjectsComponent
  },
  {
    path: 'add-projects',
    component:AddProjectsComponent
  },
  {
    path: 'edit-projects',
    component:EditProjectsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
