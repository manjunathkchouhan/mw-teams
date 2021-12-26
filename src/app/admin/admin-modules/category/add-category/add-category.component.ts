import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/api-services/category.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  createCategory: FormGroup;
  constructor(
    public titleService:TitleService,
    public iconService:IconService,
    private routes: Router,
    private _location: Location,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.form();
  }

  form(){
    this.createCategory = new FormGroup({
      category: new FormControl("", [Validators.required])
    });
  }

  createCategorySubmit(){
    console.log(this.createCategory.value);
    this.categoryService.addCategory(this.createCategory.value).subscribe((res: any) =>{
      console.log(res);
      // if(res.length > 0){
        console.log(res);
        this.routes.navigate(['/admin/category/view-category']);
      // }
    })
  }

  goBack(){
    this._location.back();
  }

}
