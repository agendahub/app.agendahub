import { Component, Inject } from "@angular/core";
import { LoaderService } from "../../services/loader.service";
import { NgxUiLoaderService, SPINNER } from "ngx-ui-loader";
import { DOCUMENT } from "@angular/common";

@Component({
    selector: "loader",
    template: ` 
    <!-- <div class="absolute" style="z-index: 99999;" *ngIf="isLoading">
        <div pAnimate enterClass="flip" leaveClass="fadeoutleft" class="fixed w-screen h-screen flex justify-center items-center bg-opacity-30 bg-slate-600">
            
            
            <p-progressSpinner></p-progressSpinner>
        </div>
    </div> -->
    <ngx-ui-loader 
	[fgsType]="option"
	[bgsType]="option"
	bgsColor="#71798a"
    [bgsOpacity]="0.5"
    bgsPosition="bottom-right"
    [bgsSize]="60"
	blur="5"
    delay="0"
    fastFadeOut="true"
    fgsColor="#71798a"
    fgsPosition="center-center"
    [fgsSize]="60"
    [gap]="24"
    logoPosition="center-center"
    [logoSize]="120"
    logoUrl=""
    masterLoaderId="master"
    overlayBorderRadius="0"
    overlayColor="rgba(40 40 40 0.8)"
    pbColor="#71798a"
    pbDirection="ltr"
    [pbThickness]="3"
    [hasProgressBar]="true"
    textColor="#FFFFFF"
    textPosition="center-center"
    >
    </ngx-ui-loader>
    `,
    styles: []
})
export class LoaderComponent {

    isLoading = false;
    option = SPINNER.threeStrings;


    constructor(private loaderService: LoaderService, private ngxLoader: NgxUiLoaderService, @Inject(DOCUMENT) private document: Document) {
        this.loaderService.isLoading.subscribe(x  => {
            this.isLoading = x.state;

            if (this.isLoading) {
                this.document.body.classList.add("cursor-wait");
            } else {
                this.document.body.classList.remove("cursor-wait");
            }

            if (x.isBack) {
                x.state ? this.ngxLoader.startBackground(x.taskId) : this.ngxLoader.stopBackground(x.taskId);
            } else {
                x.state ? this.ngxLoader.start(x.taskId) : this.ngxLoader.stop(x.taskId);
            }
        });       
    }

}