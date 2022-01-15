import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from './services/api-services/admin.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AdminService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this._authService.loggedIn()){
        return true;
      }else{
        this.router.navigate(['/core/login']);
        return false;
      }
  }
}
