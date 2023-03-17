import { Injectable } from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  validatorNgClass(input: NgModel, formulario: NgForm): string {
    if (input.valid) {
      return 'is-valid'
    } else if (input.dirty && input.invalid || formulario.submitted && input.invalid) {
      return 'is-invalid'
    }
    return '';
  }

  validatorisFormSubmitted(input: NgModel, formulario: NgForm):boolean {
    return !!(formulario.submitted && input.invalid);
  }
  validatorisInputDirtyOrFormSubmitted(input: NgModel, formulario: NgForm):boolean {
    return !!(input.dirty && input.invalid || formulario.submitted && input.invalid);
  }
}
