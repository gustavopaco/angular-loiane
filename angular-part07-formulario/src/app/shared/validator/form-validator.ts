import {AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors} from "@angular/forms";
import {map, Observable} from "rxjs";
import {VerificaEmailService} from "../service/verifica-email.service";

export class FormValidator {
  static validateNgClassInput(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'is-valid'
    } else if (this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input)) {
      return 'is-invalid'
    }
    return '';
  }

  static validateNgClassInputPENDING(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'is-valid'
    } else if (this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input) || input.pending) {
      return 'is-invalid'
    }
    return '';
  }


  static validateNgClassLabel(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'valid-feedback'
    } else if (this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input)) {
      return 'invalid-feedback'
    }
    return '';
  }

  static validateNgClassSmall(input: FormControl): string {
    return input.valid ? 'valid-feedback' : 'invalid-feedback'
  }

  static validateSmallMessage(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'Válido';
    } else if (this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input)) {
      return '*Campo obrigatório';
    } else {
      return 'Campo inválido';
    }
  }

  static validateGenericSmallMessage(input: FormControl, inputName: string, inputNameEqualsTo?: string): string {
    if (input.errors) {
      return input.hasError('required') ? `*${inputName} obrigatório.`
        : input.hasError('minlength') ? `*Mínimo de ${input.errors['minlength'].requiredLength} caracteres.`
          : input.hasError('maxlength') ? `*Máximo de ${input.errors['maxlength'].requiredLength} caracteres.`
            : input.hasError('email') ? `*E-mail inválido.`
              : input.hasError('emailInUse') ? `*E-mail já existe.`
                : input.hasError('cepInvalido') ? `*CEP inválido.`
                  : input.hasError('equalsTo') ? `*${inputName} e ${inputNameEqualsTo}, devem ser iguais.`
                    : input.hasError('min') ? `*${inputName} deve ser maior ou igual a ${input.errors['min'].min}`
                      : input.hasError('max') ? `*${inputName} deve ser menor ou igual a ${input.errors['max'].max}`
                        : inputName
    }
    return `${inputName} Válido`
  }

  static validateInterpolationLabel(formSubmitted: boolean, input: FormControl, defaultMessage: string) {
    return this.validateIsInputDirtyOrFormSubmittedReactive(formSubmitted, input) ? `${defaultMessage} obrigatório` : defaultMessage
  }

  static validateIsFormSubmittedReactive(formSubmitted: boolean, input: FormControl): boolean {
    return (formSubmitted && input.invalid);
  }

  static validateIsInputDirtyOrFormSubmittedReactive(formSubmitted: boolean, input: FormControl): boolean {
    return (input.dirty && input.invalid || formSubmitted && input.invalid);
  }

  private static validateIsDirtyAndInvalid(input: FormControl): boolean {
    return (input.dirty && input.invalid)
  }

  static validateIsMailInvalid(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateIsDirtyAndInvalid(input) && input.errors['email'])
    }
    return false
  }

  static validateIsMailInvalidMessage(input: FormControl, defaultMessage: string): string {
    return (this.validateIsMailInvalid(input) ? 'E-mail inválido' : defaultMessage)
  }

  static validateIsMinLength(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateIsDirtyAndInvalid(input) && input.errors['minlength'])
    }
    return false
  }

  static validateIsMinLengthMessage(input: FormControl, defaultMessage: string): string {
    if (this.validateIsMinLength(input)) {
      if (input.errors) {
        return `Mínimo de ${input.errors['minlength'].requiredLength} caracteres.`
      }
    }
    return defaultMessage;
  }

  static validateIsMaxLength(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateIsDirtyAndInvalid(input) && input.errors['maxlength'])
    }
    return false
  }

  static validateIsMaxLengthMessage(input: FormControl, defaultMessage: string): string {
    if (this.validateIsMaxLength(input)) {
      if (input.errors) {
        return `Máximo de ${input.errors['maxlength'].requiredLength} caracteres.`
      }
    }
    return defaultMessage;
  }

  static validateIsMinLengthOrMaxLengthMessage(input: FormControl, defaultMessage: string): string {
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

  static validateNgClassInputFormArray(input: string, formSubmitted: boolean, itemFormArray: AbstractControl): string {
    return this.validateNgClassInput(formSubmitted, (<FormControl>itemFormArray.get(input)));
  }

  static validateNgClassInputFormArray2(input: string, formSubmitted: boolean, formArray: FormArray, index: number): string {
    // let inputFormControl = formulario.get(formArrayName)?.get(String(index))?.get(input) as FormControl;
    let inputFormControl = formArray.get(String(index))?.get(input) as FormControl
    return this.validateNgClassInput(formSubmitted, inputFormControl);
  }

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateMinCheckBox seja aplicado no FormBuilder*/
  static validateCustomNgClassMinCheckBox(formSubmitted: boolean, formArray: FormArray): string {
    return (formArray.dirty && formArray.invalid || formSubmitted && formArray.invalid) ? 'is-invalid' : '';
  }

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateCep seja aplicado no FormBuilder*/
  static validateCustomIsCepInvalidMessage(input: FormControl, defaultMessage: string): string {
    return input.hasError('cepInvalido') ? "CEP inválido" : defaultMessage;
  }

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateEqualsTo seja aplicado no FormBuilder*/
  static validateCustomIsEqualsToMessage(input: FormControl, defaultMessage: string): string {
    return input.hasError('required') ? defaultMessage : 'E-mail e Confirmar E-mail são diferentes';
  }

  static validateCustomEmailInUse(input: FormControl, defaultMessage: string): string {
    return input.status == 'PENDING' ? 'Verificando'
      : input.valid ? 'E-mail válido'
        : input.hasError('email') ? 'E-mail inválido'
          : input.hasError('emailInUse') ? 'E-mail já existe'
            : defaultMessage
  }


  /*Note: Metodo para FormArray de Booleans, usado na parte de Validators na criacao do formulario.array
  *  Nesse metodo estamos usando o itemArray.value como comparacao pq la dentro so tem true ou false por que é um Array de Boolean
  *  com isso podemos contar quantos valores sao true, e
  *  se a quantidade de valores TRUE for >= 1, que é o minimo setado na assinatura do metodo, entao esta valido
  *  senao colocamos o setamos o erro {required: true}*/
  static formBuilderValidateMinCheckBox(minValid = 1) {
    return function (formArray: AbstractControl) {
      if (formArray instanceof FormArray) {
        // const totalChecked = formArray.controls
        //   .map(item => item.value)
        //   .reduce((total:any, current: any) => current ? total + current : total, 0)
        let totalChecked = 0;
        formArray.controls.forEach(itemArray => {
          if (itemArray.value) {
            totalChecked++;
          }
        })
        return totalChecked >= minValid ? null : {required: true}
      }
      throw new Error('formArray is not an instance of FormArray')
    }
  }

  static formBuilderValidateCep(input: FormControl) {
    if (input.value != undefined && input.value != "") {
      const validacep = /^[0-9]{5}-[0-9]{3}$/;
      const validacep2 = /^[0-9]{8}$/;
      return (validacep.test(input.value) || validacep2.test(input.value)) ? null : {cepInvalido: true}
    }
    return null;
  }

  static formBuilderValidateEqualsTo(otherInput: string) {
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

  static formBuilderValidateEmailAsync(verificaEmailService: VerificaEmailService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> => {
      return verificaEmailService.asyncValidateMail(control.value)
        .pipe(
          map((emailExiste: boolean) => emailExiste ? {emailInUse: true} : {})
        );
    }
  }
}
