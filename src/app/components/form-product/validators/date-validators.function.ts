import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateNotLessThanCurrent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const inputDate = new Date(control.value + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const inputUTC = inputDate.getTime();
        const todayUTC = today.getTime();
        return inputUTC >= todayUTC ? null : { dateNotPass: { value: control.value } };

    };
}
