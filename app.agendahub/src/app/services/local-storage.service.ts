import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private commomStrings = ["false", "true", "undefined", "null", "NaN"];

  constructor() {}

  public get(key: string) {
    let object = localStorage.getItem(key);

    if (object) {
      switch (typeof object) {
        case "object" : return object != null ? JSON.parse(object) : object
        case "string" : 
          if (this.commomStrings.includes(object)) {
            return eval(object);
          }

          return object.toString();
          
        default: return object
      }
    } 

    return null;

    // return object && typeof object == "object" ? JSON.parse(object) : eval(object ?? "null");
  }

  public set(key: string, value: any) {
    let object = value && typeof value == "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, object);
    return this.get(key);
  }

  public delete(key: string) {
    let object = this.get(key);
    localStorage.removeItem(key);
    return object;
  }

}
