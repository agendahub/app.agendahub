import { Injectable } from "@angular/core";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class LoaderService {

    isLoading: Subject<{state:boolean, isBack: boolean, taskId?: string}> = new Subject();
    private countCommands = 0;

    constructor(private ngxLoader: NgxUiLoaderService) { }

    show(taskId?: string) {
      if (this.countCommands == 0) {
        this.isLoading.next({state:true, isBack: false, taskId: taskId});
        this.countCommands++;
      }
    }

    hide(taskId?: string) {
      if (this.countCommands > 0) {
        this.countCommands--;
        if (this.countCommands == 0) {
          this.isLoading.next({state:false, isBack: false, taskId: taskId});
        }
      }
    }

    showBackground(taskId?: string) {
      this.isLoading.next({state:true, isBack: true, taskId: taskId});
    }

    hideBackground(taskId?: string) {
      this.isLoading.next({state:false, isBack: true, taskId: taskId});
    }

}