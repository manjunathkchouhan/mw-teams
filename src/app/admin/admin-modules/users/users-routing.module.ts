import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-users',
    pathMatch: 'full'
  },
  {
    path: 'view-users',
    component:ViewUsersComponent
  },
  {
    path: 'add-users',
    component:AddUsersComponent
  },
  {
    path: 'edit-users',
    component:EditUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
