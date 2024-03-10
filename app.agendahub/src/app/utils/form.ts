import { FormGroup } from "@angular/forms";

export class FormUtils {
    
    private initalState: unknown;

    constructor(public form: FormGroup) {
        this.initalState = form.value;
    }

    public reset() {
        this.form.reset(this.initalState);
    }

}