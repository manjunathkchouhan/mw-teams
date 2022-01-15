import { Component, OnInit } from '@angular/core';
import { AdminSideNavService } from 'src/app/services/side-navbar/admin-side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  menuItems: any = [];
  loggedUser: any;
  constructor(
    private navService: AdminSideNavService
  ) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'))
    this.getSideNavbarItems();
  }


  getSideNavbarItems() {
    this.menuItems=this.navService.getSideNavbarItems();
    // console.log(this.menuItems);
  }

}
