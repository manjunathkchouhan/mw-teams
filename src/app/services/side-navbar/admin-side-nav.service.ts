import { Injectable } from '@angular/core';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  id: string;
}
export const ROUTES: RouteInfo[] = [
  { id: 'Dashboard', path: 'dashboard', title: 'Dashboard', icon: 'dashboard' },
  { id: 'User', path: 'users', title: 'User', icon: 'person' },
  { id: 'Category', path: 'category', title: 'Category', icon: 'category' },
  { id: 'Projects', path: 'projects', title: 'Projects', icon: 'list_alt' },
  { id: 'Task', path: 'tasks', title: 'Task', icon: 'receipt' },
  { id: 'Reports', path: 'reports', title: 'Reports', icon: 'list' },
  { id: 'SignOut', path: 'signOut', title: 'Sign Out', icon: 'exit_to_app' }

];

@Injectable({
  providedIn: 'root'
})
export class AdminSideNavService {

  constructor() { }
  getSideNavbarItems(){
    return ROUTES;
  }
}
