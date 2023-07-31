import { Component } from "@angular/core";
import { LoaderService } from "../../services/loader.service";

@Component({
    selector: "loader",
    template: ` 
    <div class="absolute" style="z-index: 99999;" *ngIf="isLoading">
        <div pAnimate enterClass="flip" leaveClass="fadeoutleft" class="fixed w-screen h-screen flex justify-center items-center bg-opacity-30 bg-slate-600">
            <!-- <p-progressSpinner styleClass="w-4rem h-4rem" strokeWidth="8" fill="var(--surface-ground)"></p-progressSpinner>  -->
            
            <p-progressSpinner></p-progressSpinner>
        </div>
    </div>
    `,
    styles: []
})
export class LoaderComponent {

    isLoading = false;

    constructor(private loaderService: LoaderService) {
        loaderService.isLoading.subscribe(x  => {
            if (this.isLoading && !x) {
                this.isLoading = x
            } else if (!this.isLoading && x) {
                this.isLoading = x
            }
        });       
    }

}