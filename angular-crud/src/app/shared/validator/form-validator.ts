import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {Subscription} from "rxjs";

export class FormValidator {
  static validateInputNgClass(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'is-valid'
    }
    if (this.validateGenericIsInputDirtyOrFormSubmitted(formSubmitted, input)) {
      return 'is-invalid'
    }
    return '';
  }

  static validateInputNgClassPENDING(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'is-valid'
    }
    if (this.validateGenericIsInputDirtyOrFormSubmitted(formSubmitted, input) || input.pending) {
      return 'is-invalid'
    }
    return '';
  }


  static validateLabelNgClass(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'valid-feedback'
    }
    if (this.validateGenericIsInputDirtyOrFormSubmitted(formSubmitted, input)) {
      return 'invalid-feedback'
    }
    return '';
  }

  static validateLabelInterpolation(formSubmitted: boolean, input: FormControl, inputName: string) {
    return this.validateGenericIsInputDirtyOrFormSubmitted(formSubmitted, input) ? `*${inputName} obrigatório.` : inputName
  }

  static validateSmallNgClass(input: FormControl): string {
    return input.valid ? 'valid-feedback' : 'invalid-feedback'
  }

  static validateSmallBasicMessage(formSubmitted: boolean, input: FormControl): string {
    if (input.valid) {
      return 'Válido';
    }
    if (this.validateGenericIsInputDirtyOrFormSubmitted(formSubmitted, input)) {
      return '*Campo obrigatório';
    }
    return 'Campo inválido';
  }

  static validateSmallGenericMessage(input: FormControl, inputName: string, inputNameEqualsTo?: string): string {
    if (input?.errors) {
      const errorMessages: Record<string, string> = {
        required: `*${inputName} obrigatório.`,
        mask: `*${inputName} inválido.`,
        minlength: `*Mínimo de ${input.errors['minlength']?.requiredLength} caracteres.`,
        maxlength: `*Máximo de ${input.errors['maxlength']?.requiredLength} caracteres.`,
        email: `*E-mail inválido.`,
        emailInUse: `*E-mail já existe.`,
        cepInvalido: `*CEP inválido.`,
        bsDate: `*Formato de data inválido.`,
        equalsTo: `*${inputName} e ${inputNameEqualsTo}, devem ser iguais.`,
        min: `*${inputName} deve ser maior ou igual a ${input.errors['min']?.min}.`,
        max: `*${inputName} deve ser menor ou igual a ${input.errors['max']?.max}.`
      }
      return this.loopIntoInputErrors(input, inputName, errorMessages)
    }
    return `${inputName} válido`;
  }

  private static loopIntoInputErrors(input: FormControl, inputName: string, errorMessages: Record<string, string>): string {
    if (input?.errors) {
      for (let errorsKey in input.errors) {
        if (input.errors.hasOwnProperty(errorsKey) && errorMessages.hasOwnProperty(errorsKey)) {
          return errorMessages[errorsKey]
        }
      }
    }
    return `${inputName}`
  }

  static validateSmallGenericMessageFormArray(input: string, inputName: string, itemFormArray: AbstractControl, inputNameEqualsTo?: string): string {
    return this.validateSmallGenericMessage(<FormControl>itemFormArray.get(input), inputName, inputNameEqualsTo)
  }

  static validateGenericIsFormSubmitted(formSubmitted: boolean, input: FormControl): boolean {
    return (formSubmitted && input.invalid);
  }

  static validateGenericIsInputDirtyOrFormSubmitted(formSubmitted: boolean, input: FormControl): boolean {
    return (input.dirty && input.invalid || formSubmitted && input.invalid);
  }

  private static validateGenericIsDirtyAndInvalid(input: FormControl): boolean {
    return (input.dirty && input.invalid)
  }

  static validateHasMailError(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateGenericIsDirtyAndInvalid(input) && input.errors['email'])
    }
    return false
  }

  static validateSmallBasicMailInvalidMessage(input: FormControl, defaultMessage: string): string {
    return (this.validateHasMailError(input) ? 'E-mail inválido' : defaultMessage)
  }

  static validateHasMinLengthError(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateGenericIsDirtyAndInvalid(input) && input.errors['minlength'])
    }
    return false
  }

  static validateSmallBasicMinLengthMessage(input: FormControl, defaultMessage: string): string {
    if (this.validateHasMinLengthError(input)) {
      if (input.errors) {
        return `Mínimo de ${input.errors['minlength']?.requiredLength} caracteres.`
      }
    }
    return defaultMessage;
  }

  static validateHasMaxLengthError(input: FormControl): boolean {
    if (input.errors) {
      return (this.validateGenericIsDirtyAndInvalid(input) && input.errors['maxlength'])
    }
    return false
  }

  static validateSmallBasicMaxLengthMessage(input: FormControl, defaultMessage: string): string {
    if (this.validateHasMaxLengthError(input)) {
      if (input.errors) {
        return `Máximo de ${input.errors['maxlength']?.requiredLength} caracteres.`
      }
    }
    return defaultMessage;
  }

  static validateSmallBasicMinLengthOrMaxLengthMessage(input: FormControl, defaultMessage: string): string {
    if (this.validateHasMinLengthError(input)) {
      if (input.errors) {
        return `Mínimo de ${input.errors['minlength']?.requiredLength} caracteres.`
      }
    } else if (this.validateHasMaxLengthError(input)) {
      if (input.errors) {
        return `Máximo de ${input.errors['maxlength']?.requiredLength} caracteres.`
      }
    }
    return defaultMessage;
  }

  static validateInputNgClassFormArray(input: string, formSubmitted: boolean, itemFormArray: AbstractControl): string {
    return this.validateInputNgClass(formSubmitted, (<FormControl>itemFormArray.get(input)));
  }

  static validateInputNgClassFormArray2(input: string, formSubmitted: boolean, formArray: FormArray, index: number): string {
    // let inputFormControl = formulario.get(formArrayName)?.get(String(index))?.get(input) as FormControl;
    let inputFormControl = formArray.get(String(index))?.get(input) as FormControl
    return this.validateInputNgClass(formSubmitted, inputFormControl);
  }

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateMinCheckBox seja aplicado no FormBuilder*/
  static validateInputAndDivParentNgClassMinCheckBoxCustom(formSubmitted: boolean, formArray: FormArray): string {
    return (formArray.dirty && formArray.invalid || formSubmitted && formArray.invalid) ? 'is-invalid' : '';
  }

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateCep seja aplicado no FormBuilder*/
  static validateSmallBasicCepInvalidMessageCustom(input: FormControl, defaultMessage: string): string {
    return input.hasError('cepInvalido') ? "CEP inválido" : defaultMessage;
  }

  /*Obs: Para essa validacao CUSTOM funcionar no HTML precisamos que o metodo formBuilderValidateEqualsTo seja aplicado no FormBuilder*/
  static validateSmallBasicIsEqualsToMessageCustom(input: FormControl, defaultMessage: string): string {
    return input.hasError('required') ? defaultMessage : 'E-mail e Confirmar E-mail são diferentes';
  }

  static validateSmallGenericEmailInUseMessageCustom(input: FormControl, defaultMessage: string): string {
    if (input.status == 'PENDING') {
      return 'Verificando';
    }
    if (input.hasError('email')) {
      return 'E-mail inválido';
    }
    if (input.hasError('emailInUse')) {
      return 'E-mail já existe';
    }
    if (input.valid) {
      return 'E-mail válido';
    }
    return defaultMessage;
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
      const validacep = /^\d{5}-\d{3}$/;
      const validacep2 = /^\d{8}$/;
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

  // Note: Esta comentado porque VerificaEmailService nao existe. Para nao dar erro
  // static formBuilderValidateEmailAsync(verificaEmailService: VerificaEmailService): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors> => {
  //     return verificaEmailService.asyncValidateMail(control.value)
  //       .pipe(
  //         map((emailExiste: boolean) => emailExiste ? {emailInUse: true} : {})
  //       );
  //   }
  // }

  static formBuilderValidatePasswordRegex(control: AbstractControl) {
    const password = control.value;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~<>,.?/[\]{}|])[A-Za-z\d!@#$%^&*()_+~<>?,.:;"{}\\[\]/|]{8,}/;

    return validPassword.test(password) ? null : {passwordInvalid: true}
  }

  static validateConfirmPasswordEqualsTo(formulario: FormGroup): Subscription {
    return formulario.get('confirmPassword')!.valueChanges.subscribe(() => {
      FormValidator.validateEqualsTo(formulario);
    });
  }

  static validatePasswordEqualsTo = (formulario: FormGroup): Subscription => {
    return formulario.get('password')!.valueChanges.subscribe(() => {
      if (formulario.get('password')?.valid) {
        FormValidator.validateEqualsTo(formulario);
      }
    });
  };

  private static validateEqualsTo(formulario: FormGroup) {
    if (formulario.get('confirmPassword')?.dirty && formulario.get('password')?.value !== formulario.get('confirmPassword')?.value) {
      formulario.get('confirmPassword')?.setErrors({equalsTo: true})
    } else if (formulario.get('confirmPassword')?.dirty && formulario.get('password')?.value === formulario.get('confirmPassword')?.value) {
      formulario.get('confirmPassword')?.setErrors(null)
    }
  }

  static emailCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email: string = control.value;

      if (email && (email.includes('.com') || email.includes('.com.br'))) {
        return null; // O e-mail é válido
      } else {
        return {email: true}; // O e-mail é inválido
      }
    };
  }
}
