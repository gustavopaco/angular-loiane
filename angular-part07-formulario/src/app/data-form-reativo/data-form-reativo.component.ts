import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EnvioDadosWebserviceService} from "../shared/service/envio-dados-webservice.service";
import {Subscription} from "rxjs";
import {Usuario} from "../shared/model/usuario";
import {FormValidatorService} from "../shared/service/form-validator.service";

@Component({
  selector: 'app-data-form-reativo',
  templateUrl: './data-form-reativo.component.html',
  styles: []
})
export class DataFormReativoComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  formSubmitted: boolean = false;
  usuario: Usuario = new Usuario();
  inscricao?: Subscription

  constructor(
    private formularioBuilder: FormBuilder,
    private envioDadosWebService: EnvioDadosWebserviceService,
    private formValidatorService: FormValidatorService
  ) {
  }

  ngOnInit(): void {
    this.criandoFormBuilderReativo();
  }

  /*Note: Utilizando FormGroup e FormControl*/
  criandoFormReativo() {
    // this.formulario = new FormGroup<object>({
    //   nome: new FormControl('Valor inicial nome'),
    //   email: new FormControl(null)
    // });
  }

  criandoFormBuilderReativo() {
    this.formulario = this.formularioBuilder.group({
      nome: [this.usuario.nome, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      cep: [this.usuario.endereco.cep]
    })
  }

  onSubmit() {
    console.log(this.formulario.controls['email'])
    // console.log(this.formulario.controls['email'])
    this.formSubmitted = true;
    // this.inscricao = this.envioDadosWebService.enviarDados(JSON.stringify(this.formulario.value)).subscribe({
    //   next: (response) => {
    //     console.log(response)
    //     this.formulario.reset();
    //   },
    //   error: (err) => console.log(err)
    // });
  }

  validateNgClass(input: string): string {
    return this.formValidatorService.validateNgClassReactive(this.formSubmitted, (<FormControl>this.formulario.get(input)));
  }

  validateIsFormSubmitted(input: string): boolean {
    return this.formValidatorService.validateIsFormSubmittedReactive(this.formSubmitted, (<FormControl>this.formulario.get(input)))
  }

  validateIsInputDirtyOrFormSubmitted(input: string): boolean {
    return this.formValidatorService.validateIsInputDirtyOrFormSubmittedReactive(this.formSubmitted, (<FormControl>this.formulario.get(input)))
  }

  validateEmailInvalid(input: string): string {
    return this.formValidatorService
      .validateIsEmailInvalidReactive(<FormControl>this.formulario.get(input)) ? 'E-mail invalido' : 'E-mail obrigatório';
  }


  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }
}
