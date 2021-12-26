import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewReportsComponent } from './view-reports/view-reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-reports',
    pathMatch: 'full'
  },
  {
    path: 'view-reports',
    component:ViewReportsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
