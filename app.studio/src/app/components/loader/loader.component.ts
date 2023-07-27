import { Component } from "@angular/core";
import { LoaderService } from "../../services/loader.service";

@Component({
    selector: "loader",
    template: ` 
    <div class="absolute">
        <div class="fixed w-screen h-screen opacity-30 bg-slate-600">
            <p-progressSpinner styleClass="w-4rem h-4rem" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"></p-progressSpinner> 
        </div>
    </div>
    `,
    styles: []
})
export class LoaderComponent {

    isLoading = false;

    constructor(private loaderService: LoaderService) {
        loaderService.isLoading.subscribe(x  => this.isLoading = x);       
    }

}