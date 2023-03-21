import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from "@angular/forms";

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

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateMinCheckBox seja aplicado no FormBuilder*/
  validateNgClassMinCheckBox(formSubmitted: boolean, formArray: FormArray): string {
    return (formArray.dirty && formArray.invalid || formSubmitted && formArray.invalid) ? 'is-invalid' : '';
  }

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateCep seja aplicado no FormBuilder*/
  validateIsCepInvalidMessage(input: FormControl, defaultMessage: string) : string {
    return input.hasError('cepInvalido') ? "CEP inválido" : defaultMessage;
  }

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateEqualsTo seja aplicado no FormBuilder*/
  validateIsEqualsToMessage(input: FormControl, defaultMessage: string) : string {
    return input.hasError('required') ? defaultMessage : 'E-mail e Confirmar E-mail são diferentes';
  }


  /*Note: Metodo para FormArray de Booleans, usado na parte de Validators na criacao do formulario.array
  *  Nesse metodo estamos usando o itemArray.value como comparacao pq la dentro so tem true ou false por que é um Array de Boolean
  *  com isso podemos contar quantos valores sao true, e
  *  se a quantidade de valores TRUE for >= 1, que é o minimo setado na assinatura do metodo, entao esta valido
  *  senao colocamos o setamos o erro {required: true}*/
  formBuilderValidateMinCheckBox(minValid = 1) {
    return function (formArray: AbstractControl) {
      if (formArray instanceof FormArray) {
        // const totalChecked = formArray.controls
        //   .map(item => item.value)
        //   .reduce((total:any, current: any) => current ? total + current : total, 0)
        let totalChecked = 0;
        formArray.controls.forEach(itemArray => {
          if (itemArray.value) {
            totalChecked += 1
          }
        })
        return totalChecked >= minValid ? null : {required: true}
      }
      throw new Error('formArray is not an instance of FormArray')
    }
  }

  formBuilderValidateCep(input: FormControl) {
    if (input.value != undefined && input.value != "") {
      const validacep = /^[0-9]{5}-[0-9]{3}$/;
      const validacep2 = /^[0-9]{8}$/;
      return (validacep.test(input.value) || validacep2.test(input.value)) ? null : { cepInvalido: true }
    }
    return null;
  }

  formBuilderValidateEqualsTo(otherInput: string) {
    return function (formControl: FormControl) {
      if (otherInput == null) {
        throw new Error("É necessário informar um campo para comparação do formBuilderValidateEqualsTo")
      }
      const input = (formControl.root as FormGroup).get(otherInput)

      if (input instanceof FormControl && !input) {
        throw new Error("Input informado como parâmetro otherInput do método formBuilderValidateEqualsTo não existe")
      }
      if (input instanceof FormControl) {
        return input.value == formControl.value ? null : {equalsTo: true}
      }
      return null
    }
  }
}
