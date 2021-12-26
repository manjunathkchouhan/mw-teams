import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/api-services/category.service';
import { IconService } from 'src/app/services/titles-icons-services/icon.service';
import { TitleService } from 'src/app/services/titles-icons-services/title.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  editCategoryForm: FormGroup;
  categoryData: any;
  constructor(
    public titleService: TitleService,
    public iconService: IconService,
    private _location: Location,
    private formBuilder: FormBuilder,
    private routes: Router,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.form();
    this.getData();
  }
  form() {
    this.editCategoryForm = new FormGroup({
      category: new FormControl("", [Validators.required]),
    });
  }
  getData() {
    if (history.state.data != undefined) {
      console.log(history.state.data);
      this.categoryData = history.state.data;
      this.setValue();
    } else {
      this.goBack();
    }
  }
  setValue() {
    this.editCategoryForm.patchValue({
      category: this.categoryData.category
    });
  }

  editedCategoryFormSubmit(){
    this.editCategoryForm.value.category_id = this.categoryData.category_id;
    this.categoryService.updateCategory(this.editCategoryForm.value).subscribe((res: any) =>{
      if(res){
        console.log(res);
        this.routes.navigate(['/admin/category/view-category']);
      }
    })
  }
  goBack() {
    this._location.back();
  }
}
