import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() { }

  public titles={
    // category
    admin_view_category: 'Category',
    admin_add_category: "Add Category",
    admin_edit_category:"Edit Category",

     // projects
     admin_view_projects: 'Projects',
     admin_add_projects: "Add Projects",
     admin_edit_projects:"Edit Projects",

     // users
      admin_view_users: 'Users',
      admin_add_users: "Add Users",
      admin_edit_users:"Edit Users",

         // tasks
         admin_view_task: 'Task',
         admin_add_task: "Add Task",
         admin_edit_task:"Edit Task",
  }
  public tooltip={
    // category
    admin_add_category:"Add Category",
    view_or_Edit: "View/Edit",
    delete: "Delete",

   // projects
   admin_add_projects:"Add Projects",

   // users
   admin_add_users:"Add Users",

   //task
   admin_add_task: "Add Task",
  }

  public btn={
    submit:"Submit",
    cancel:"Cancel"
  }
  public pagination={
    itemsPerPage:10
  }
}
