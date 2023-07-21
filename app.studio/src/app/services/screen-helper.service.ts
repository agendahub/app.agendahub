import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenHelperService {

  public specs: {isMobile: any, isDesktop: any, isMid: any} = {
    isMobile: null,
    isDesktop: null,
    isMid: null
  }

  private get isMobile() {
    return this.specs.isMobile
  }

  private get isDesktop() {
    return this.specs.isDesktop
  }
  
  private get isMid() {
    return this.specs.isMid;
  }

  private set isMobile(value: boolean) {
    this.specs.isMobile = value;
  }

  private set isDesktop(value: boolean) {
    this.specs.isDesktop = value;
  }

  private set isMid(value: boolean) {
    this.specs.isMid = value;
  }

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.checkSize();
    this.checkChanges();
  }

  checkChanges() {
    window.onresize = (ev) => this.checkSize()
  }

  checkSize() {
    this.isMobile = this.document.body.clientWidth <= 600;
    this.isMid = this.document.body.clientWidth > 600 && this.document.body.clientWidth <= 1033;
    this.isDesktop = this.document.body.clientWidth > 1033;

    console.log(this.specs);
    
  }

  public getTableSize() {
    if (this.isMobile) {
      return "p-datatable-sm"
    }
    if (this.isDesktop) {
      return "p-datatable-lg"
    } 
    
    return ""
    
  }


}
