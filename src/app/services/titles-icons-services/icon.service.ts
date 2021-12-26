import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor() { }
  public fa_icons={
    plus:"fa fa-plus",
    edit:"fa fa-edit",
    back:"fa fa-arrow-left",
    delete:"fa fa-trash-o",
  }
  public material_icons={

  }
}
