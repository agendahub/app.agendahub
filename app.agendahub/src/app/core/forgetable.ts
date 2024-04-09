import { inject } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";

export class Forgetable {

    private router = inject(Router);

    constructor() {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                console.log('Forgetable');
                
                this.forget();
            }
        });
    }

    public forget() {
        
    }

}