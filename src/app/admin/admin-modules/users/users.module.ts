import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AddUsersComponent } from './add-users/add-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserFilterPipe } from 'src/app/pipe/user-filter.pipe';


@NgModule({
  declarations: [
    AddUsersComponent,
    ViewUsersComponent,
    EditUsersComponent,
    UserFilterPipe
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxPaginationModule
  ]
})
export class UsersModule { }
