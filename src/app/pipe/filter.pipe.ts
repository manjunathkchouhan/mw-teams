import { Pipe, PipeTransform, Injectable} from '@angular/core';
import { single } from 'rxjs/operators';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any,field: string, value: any): any {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    if (field === 'Category Name') {
      return items.filter(singleItem =>
        singleItem.category.toLowerCase().includes(value.toLowerCase()))
    }
    if(field === 'Name'){
      return items.filter(singleItem =>
        singleItem.first_name.toLowerCase().includes(value.toLowerCase()))
    }
  }

}
