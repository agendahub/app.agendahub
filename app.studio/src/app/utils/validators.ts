import { AbstractControl } from "@angular/forms";
import { notNull } from "./util";

export class CustomValidators {
    static notEqualsTo<T, S>(compare: string, comparator: (o: T, c: S) => boolean = (o: unknown, c: unknown) => o !== c, message?: string) {
        return (control: AbstractControl) => {
            if (control.value === null || control.value.length === 0) {
                return null;
            }
            const originValue = control.value;
            const compareValue = control.root.get(compare)?.value;

            if (!notNull(originValue) && !notNull(compareValue)) {
                return null
            }
            
            if (notNull(originValue) && notNull(compareValue) && comparator(originValue, compareValue)) {
                return null;
            }

            return { notEqualsTo: message ?? true };
        };
    }

    static dateRange() {
        return (control: AbstractControl) => {
            const value = control.value;

            if (value === null || value.length === 0) {
                return null;
            }

            if (value[0] && value[1]) {
                return null;
            }

            return { dateRange: true };
        };
    }
}

export class ValidatorsHelper {
    static getErrorMessage(form: AbstractControl, field: string, key?: string) {
        const errors = form.get(field)?.errors;
        
        if (errors) {
            const error = key ? errors[key] : errors[Object.keys(errors)[0]];
            if (error) {
                return error;
            }
        }
        return null;
    }
}

