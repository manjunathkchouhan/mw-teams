import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminSideNavService } from 'src/app/services/side-navbar/admin-side-nav.service';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.scss']
})
export class AdminSideNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  menuItems: any = [];
  constructor(
    private breakpointObserver: BreakpointObserver, private navService: AdminSideNavService
  ) { }

  ngOnInit(): void {
    this.getSideNavbarItems();
  }

  getSideNavbarItems() {
    this.menuItems=this.navService.getSideNavbarItems();
    // console.log(this.menuItems);
  }

}
