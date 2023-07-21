import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get(key: string) {
    let object = localStorage.getItem(key);
    return object ? JSON.parse(object) : null;
  }

  public set(key: string, value: any) {
    let object = JSON.stringify(value);
    localStorage.setItem(key, object);
    return this.get(key);
  }

  public delete(key: string) {
    let object = this.get(key);
    localStorage.removeItem(key);
    return object;
  }

}
