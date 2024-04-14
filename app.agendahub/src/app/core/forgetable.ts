import { inject } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

export abstract class Forgetable {

    private router = inject(Router);

    constructor() {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.forget();
            }
        });
    }

    public abstract forget() : void;

}