import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Location} from '@angular/common';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/api-services/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
  encapsulation: ViewEncapsulation.None
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
  isLoading = false;
  searchString;
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
        option: "Category Name",
        value: "Category Name"
      }];
      this.getAllCategory();
  }
  getAllCategory(){
    this.isLoading = true;
    this.categoryService.getCategory().subscribe((res:any) =>{
      this.isLoading = false;
      if(res){
        this.allCategories = res;
      }
    })
  }
  pagination(event) {
    this.p = event;
    this.getAllCategory();
  }
  goBack(){
    this._location.back();
  }

  editCategory(item){
    this.routes.navigate(['/admin/category/edit-category'],  {state:{data: item}});
  }
  deleteCategory(item){
    this.isLoading = true;
    let category = {
      category_id: item.category_id
    }
    this.categoryService.deleteCategory(category).subscribe((res:any) =>{
      this.isLoading = false;
      if(res){
        this.getAllCategory();
      }
    })
  }
  filterByValidation(filterBy) {
    if (filterBy === undefined) {
      // this.toastr.error('Enter filter value to search');
    }
  }
}
