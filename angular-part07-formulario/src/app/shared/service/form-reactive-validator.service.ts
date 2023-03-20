import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormReactiveValidatorService {

  constructor() {
  }

  validateNgClassInput(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'is-valid'
    } else if (this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input)) {
      return 'is-invalid'
    }
    return '';
  }


  validateNgClassLabel(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'valid-feedback'
    } else if (this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input)) {
      return 'invalid-feedback'
    }
    return '';
  }

  validateInterpolationLabel(formSubmitted: boolean, input: FormControl, defaultMessage: string) {
    return this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input) ? `*${defaultMessage} obrigatório` : defaultMessage
  }

  validateIsFormSubmittedReactive(formSubmitted: boolean, input: FormControl): boolean {
    return (formSubmitted && input.invalid);
  }

  validateIsInputDirtyOrFormSubmittedReactive(formSubmitted: boolean, input: FormControl): boolean {
    return (input.dirty && input.invalid || formSubmitted && input.invalid);
  }

  private validateIsDirtyAndInvalid(input: FormControl): boolean {
    return (input.dirty && input.invalid)
  }

  validateIsMailInvalid(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateIsDirtyAndInvalid(input) && input.errors['email'])
    }
    return false
  }

  validateIsMailInvalidMessage(input: FormControl, defaultMessage: string): string {
    return (this.validateIsMailInvalid(input) ? 'E-mail inválido' : defaultMessage)
  }

  validateIsMinLength(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateIsDirtyAndInvalid(input) && input.errors['minlength'])
    }
    return false
  }

  validateIsMinLengthMessage(input: FormControl, defaultMessage: string): string {
    if (this.validateIsMinLength(input)) {
      if (input.errors) {
        return `Mínimo de ${input.errors['minlength'].requiredLength} caracteres.`
      }
    }
    return defaultMessage;
  }

  validateIsMaxLength(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateIsDirtyAndInvalid(input) && input.errors['maxlength'])
    }
    return false
  }

  validateIsMaxLengthMessage(input: FormControl, defaultMessage: string): string {
    if (this.validateIsMaxLength(input)) {
      if (input.errors) {
        return `Máximo de ${input.errors['maxlength'].requiredLength} caracteres.`
      }
    }
    return defaultMessage;
  }

  validateIsMinLengthOrMaxLengthMessage(input: FormControl, defaultMessage: string): string {
    if (this.validateIsMinLength(input)) {
      if (input.errors) {
        return `Mínimo de ${input.errors['minlength'].requiredLength} caracteres.`
      }
    } else if (this.validateIsMaxLength(input)) {
      if (input.errors) {
        return `Máximo de ${input.errors['maxlength'].requiredLength} caracteres.`
      }
    }
    return defaultMessage;
  }

  validateNgClassInputFormArray(input:string, formSubmitted: boolean, itemFormArray: AbstractControl): string {
    return this.validateNgClassInput(formSubmitted, (<FormControl> itemFormArray.get(input)));
  }
  validateNgClassInputFormArray2(input: string, formSubmitted: boolean, formArray: FormArray, index: number): string {
    // let inputFormControl = formulario.get(formArrayName)?.get(String(index))?.get(input) as FormControl;
    let inputFormControl = formArray.get(String(index))?.get(input) as FormControl
    return this.validateNgClassInput(formSubmitted, inputFormControl);
  }
}
