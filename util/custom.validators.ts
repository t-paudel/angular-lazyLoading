import { AbstractControl } from '@angular/forms';

export class CustomValidators {
  static compareStartAndEnddate(dateGroup: AbstractControl): { [key: string]: any } | null {
    console.log('CustomValidators::compareStartAndEnddate()');

    const dateGroupHeader = Object.keys(dateGroup.value);

    const startDateControl = dateGroup.get(dateGroupHeader[0]);
    const endDateControl = dateGroup.get(dateGroupHeader[1]);

    if (startDateControl !== null && endDateControl !== null) {
      if (startDateControl.value !== null && endDateControl.value !== null) {
        if (new Date(startDateControl.value) > new Date(endDateControl.value)) {
          return { EndDateGreater: true };
        }
      } else {
        return null;
      }
    }
  }
}
