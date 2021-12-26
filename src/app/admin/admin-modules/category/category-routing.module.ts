import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-category',
    pathMatch: 'full'
  },
  {
    path: 'view-category',
    component:ViewCategoryComponent
  },
  {
    path: 'add-category',
    component:AddCategoryComponent
  },
  {
    path: 'edit-category',
    component:EditCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
