import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class LoaderService {

    isLoading: Subject<boolean> = new Subject();
    private countCommands = 0;

    show() {
      if (this.countCommands == 0) {
        this.isLoading.next(true);
        this.countCommands++;
      }
    }

    hide() {
      if (this.countCommands > 0) {
        this.countCommands--;
        if (this.countCommands == 0) {
          this.isLoading.next(false);
        }
      }
    }

}