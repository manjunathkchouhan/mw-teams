import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfigService } from 'src/app/config/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string;
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.url = apiConfigService.api_url;
  }

  addCategory(categoryData){
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // }
    return this.http.post(this.url + '/categories.php?method=addNewCategory', categoryData);
  }
  getCategory(){
    return this.http.get(this.url + '/categories.php?method=getCategories');
  }
  updateCategory(categoryData){
    return this.http.post(this.url + '/categories.php?method=updateCategory', categoryData);
  }
  deleteCategory(categoryId){
    return this.http.post(this.url + '/categories.php?method=deleteCategory', categoryId);
  }
}
