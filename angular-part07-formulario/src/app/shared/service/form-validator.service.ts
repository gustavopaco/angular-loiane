import {Injectable} from '@angular/core';
import {FormControl, NgForm, NgModel} from "@angular/forms";

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



  validateNgClassReactive(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'is-valid'
    } else if (this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input)) {
      return 'is-invalid'
    }
    return '';
  }

  validateIsFormSubmittedReactive(formSubmitted: boolean, input: FormControl):boolean {
    return (formSubmitted && input.invalid);
  }

  validateIsInputDirtyOrFormSubmittedReactive(formSubmitted: boolean, input: FormControl):boolean {
    return (input.dirty && input.invalid || formSubmitted && input.invalid);
  }

  private validateIsDirtyAndInvalid (input: FormControl): boolean {
    return (input.dirty && input.invalid)
  }

  validateIsEmailInvalidReactive(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateIsDirtyAndInvalid(input) && input.errors['email'])
    }
    return false
  }
}
