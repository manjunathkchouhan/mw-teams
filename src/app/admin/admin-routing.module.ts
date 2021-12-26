import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSideNavComponent } from './admin-side-nav/admin-side-nav.component';

const routes: Routes = [
  {
    path: '', component: AdminSideNavComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren:()=>import('./admin-modules/dashboard/dashboard.module').then(dashboard=>dashboard.DashboardModule),
      },
      {
        path: 'category',
        loadChildren:()=>import('./admin-modules/category/category.module').then(category=>category.CategoryModule),
      },
      {
        path: 'projects',
        loadChildren:()=>import('./admin-modules/projects/projects.module').then(projects=>projects.ProjectsModule),
      },
      {
        path: 'users',
        loadChildren:()=>import('./admin-modules/users/users.module').then(users=>users.UsersModule),
      },
      {
        path: 'tasks',
        loadChildren:()=>import('./admin-modules/task/task.module').then(task=>task.TaskModule),
      },
      {
        path: 'reports',
        loadChildren:()=>import('./admin-modules/reports/reports.module').then(reports=>reports.ReportsModule),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
