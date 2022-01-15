import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectFilter'
})
@Injectable()
export class ProjectFilterPipe implements PipeTransform {

  transform(items: any,field: string, value: any): any {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    if(field === 'Project Name'){
      return items.filter(singleItem =>
        singleItem.project_title.toLowerCase().includes(value.toLowerCase()))
    }
  }

}
