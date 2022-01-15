import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
@Injectable()
export class UserFilterPipe implements PipeTransform {

  transform(items: any,field: string, value: any): any {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    if(field === 'Name'){
      return items.filter(singleItem =>
        singleItem.first_name.toLowerCase().includes(value.toLowerCase()))
    }
    if(field === 'Email'){
      return items.filter(singleItem =>
        singleItem.email.toLowerCase().includes(value.toLowerCase()))
    }
  }

}
