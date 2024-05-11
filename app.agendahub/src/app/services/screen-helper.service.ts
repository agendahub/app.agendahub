import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { HostListener, Inject, Injectable, OnInit, inject } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ScreenHelperService {
  private platform = inject(Platform);

  public specs: DeviceSpec = {
    isMobile: null,
    isDesktop: null,
    isMid: null,
  };

  public get isMobile(): boolean | null {
    return this.specs.isMobile;
  }

  public get isDesktop(): boolean | null {
    return this.specs.isDesktop;
  }

  public get isMid(): boolean | null {
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

  @HostListener("window:resize") checkChanges() {
    this.checkSize();
  }

  checkSize() {
    this.isMobile = this.document.body.clientWidth <= 600;
    this.isMid = this.document.body.clientWidth > 600 && this.document.body.clientWidth <= 1033;
    this.isDesktop = this.document.body.clientWidth > 1033;
  }

  currentDevice() {
    if (this.specs.isDesktop || (this.platform.isBrowser && !this.platform.IOS && !this.platform.ANDROID)) {
      return 0;
    } else if (this.specs.isMid) {
      return 1;
    } else return 2;
  }
}

export type DeviceSpec = { isMobile: boolean | null; isDesktop: boolean | null; isMid: boolean | null };
export enum DeviceEnum {
  Desktop,
  Mid,
  Mobile,
}
