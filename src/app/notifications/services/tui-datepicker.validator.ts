import { AbstractControl, ValidatorFn } from '@angular/forms';
import {TuiDay, TuiTime} from "@taiga-ui/cdk";

// checks whether tui-date-time array is not null at all cells of itself
export function deadlineValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const deadlineArray: (TuiDay | TuiTime)[] = control.value;

    if (!deadlineArray || deadlineArray.length === 0 || deadlineArray[0] === null || deadlineArray[1] === null) {
      return { 'customDeadlineError': true };
    }

    return null;
  };
}
