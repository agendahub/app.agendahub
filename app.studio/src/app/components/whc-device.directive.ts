import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DeviceEnum, DeviceSpec, ScreenHelperService } from '../services/screen-helper.service';

@Directive({
  selector: '[appWhcDevice]'
})

export class WhcDeviceDirective {

  @Input() appWhcDevice!: Partial<Record<keyof DeviceSpec, Record<string, string>>>

  constructor(
    private screenHelper: ScreenHelperService,
    private el: ElementRef
    ) { }

  private currentDevice : DeviceEnum = 0;

  @HostListener("window:resize") onResize() {
    this.evaluateDevice();
    this.currentDevice = this.screenHelper.currentDevice()
  }

  private evaluateDevice() {
    this.unsetOldDeviceStyle();
    if (this.currentDevice == DeviceEnum.Desktop && this.appWhcDevice.isDesktop) {
      this.applyNewDeviceStyle();
    } else if (this.currentDevice == DeviceEnum.Mid  && this.appWhcDevice.isMobile) {
      this.applyNewDeviceStyle();
    } else if (this.currentDevice == DeviceEnum.Mobile && this.appWhcDevice.isMid) {
      this.applyNewDeviceStyle();
    }
  }

  private applyNewDeviceStyle() {
    let styles = Object.entries(Object.values(this.appWhcDevice)[this.currentDevice]);
    styles.forEach(([key, value]) => {
      this.el.nativeElement.style[key] = value
    })
    console.log("apply");
    console.log(styles);
    
  }

  private unsetOldDeviceStyle() {
    let styles = Object.entries(Object.values(this.appWhcDevice)[this.currentDevice]);
    styles.forEach(([key, value]) => {
      this.el.nativeElement.style[key] = null
    })
    console.log("unset");
    console.log(styles);
    
  }

}
