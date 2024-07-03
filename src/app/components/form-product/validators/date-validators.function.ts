import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateNotLessThanCurrent(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const inputDate = new Date(control.value + 'T00:00:00');
        const today = new Date();
        today.setHours(0,0,0,0);
        // const forbidden = date.getTime() >= Date.now();
        // return forbidden ? { forbiddenName: { value: control.value } } : null;

        const inputUTC = inputDate.getTime();
        const todayUTC = today.getTime();
        // return inputDate >= today ? null : { dateNotPass: { value: control.value}};
        return inputUTC >= todayUTC ? null : { dateNotPass: { value: control.value}};

    };
}

// export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       const forbidden = nameRe.test(control.value);
//       return forbidden ? {forbiddenName: {value: control.value}} : null;
//     };
//   }