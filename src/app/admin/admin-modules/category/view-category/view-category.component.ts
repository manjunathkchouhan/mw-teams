import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/api-services/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {
  allCategories = [];
  // [
  //   { category: 'ERP Application'},
  //   { category: 'ERP Application 1'},
  //   { category: 'ERP Application 2'},
  //   { category: 'ERP Application 3'},
  //   { category: 'ERP Application 4'},
  //   { category: 'ERP Application 5'}
  // ];
  p: number = 1;
  filterNames: any = [];
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.filterNames = [
      {
        option: "Name",
        value: "Name"
      },
      {
        option: "Type",
        value: "Type"
      },
      {
        option: "Bond_id",
        value: "Bond_id"
      }];
      this.getAllCategory();
  }
  getAllCategory(){
    this.categoryService.getCategory().subscribe((res:any) =>{
      if(res){
        this.allCategories = res;
      }
    })
  }
  pagination(event) {
    this.p = event;
  }
  goBack(){
    this._location.back();
  }

  editCategory(item){
    this.routes.navigate(['/admin/category/edit-category'],  {state:{data: item}});
  }
  deleteCategory(item){
    let category = {
      category_id: item.category_id
    }
    this.categoryService.deleteCategory(category).subscribe((res:any) =>{
      if(res){
        this.getAllCategory();
      }
    })
  }
}
