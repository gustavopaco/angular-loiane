import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EnvioDadosWebserviceService} from "../shared/service/envio-dados-webservice.service";
import {Observable, Subscription} from "rxjs";
import {Usuario} from "../shared/model/usuario";
import {FormReactiveValidatorService} from "../shared/service/form-reactive-validator.service";
import {CEP_MAX_LEGNTH, CEP_MIN_LEGNTH} from "../shared/constant/constants";
import {ConsultaCepViacepService} from "../shared/service/consulta-cep-viacep.service";
import {DropdownService} from "../shared/service/dropdown.service";
import {Estado} from "../shared/model/estado";

@Component({
  selector: 'app-data-form-reativo',
  templateUrl: './data-form-reativo.component.html',
  styles: []
})
export class DataFormReativoComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  formularioEstado!: FormGroup;
  estado: Estado = new Estado();
  formSubmitted: boolean = false;
  usuario: Usuario = new Usuario();
  // estados: any[] = [];
  estados?: Observable<any>;
  cargos: any[] = [];
  inscricao?: Subscription;
  inscricao2?: Subscription;
  inscricao3?: Subscription;
  inscricao4?: Subscription;

  constructor(
    private formularioBuilder: FormBuilder,
    private envioDadosWebService: EnvioDadosWebserviceService,
    private formValidatorService: FormReactiveValidatorService,
    private consultaCepService: ConsultaCepViacepService,
    private dropDownService: DropdownService
  ) {
  }

  ngOnInit(): void {
    this.criandoFormBuilderReativo();
    this.mapearFormParaObjeto();
    this.carregarEstados();
    this.carregarCargos();
    this.criandoFormBuilderReativo2();
  }

  /*Inicio -> Form 1*/
  criandoFormBuilderReativo(): void {
    this.formulario = this.formularioBuilder.group({
      nome: [this.usuario.nome, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      endereco: this.formularioBuilder.group({
        cep: [this.usuario.endereco.cep, [Validators.required, Validators.minLength(CEP_MIN_LEGNTH), Validators.maxLength(CEP_MAX_LEGNTH)]],
        numero: [this.usuario.endereco.numero, Validators.required],
        complemento: [this.usuario.endereco.complemento],
        rua: [this.usuario.endereco.rua, Validators.required],
        bairro: [this.usuario.endereco.bairro, Validators.required],
        cidade: [this.usuario.endereco.cidade, Validators.required],
        estado: [this.usuario.endereco.estado, Validators.required],
      }),
      cargo: [null]
    })
  }

  mapearFormParaObjeto(): void {
    this.inscricao2 = this.formulario.valueChanges.subscribe(form => {
      this.usuario = form;
    })
  }

  // Note: Pode ser feito utilizando Observable e utilizando Pipe Async no HTML
  carregarEstados(): void {
    this.estados = this.dropDownService.getEstadosBR();
    // this.inscricao4 = this.dropDownService.getEstadosBR().subscribe(response => this.estados = response)
  }

  onSubmit(): void {
    this.formSubmitted = true;
    console.log(this.formulario)
    if (this.formulario.valid) {
      this.inscricao = this.envioDadosWebService.enviarDados(JSON.stringify(this.formulario.value)).subscribe({
        next: (response) => {
          console.log(response)
          this.formulario.reset();
        },
        error: (err) => console.log(err)
      });
    }
  }

  consultaCep(): void {
    if (this.formulario.get("endereco.cep")?.valid) {
      let cep = this.formulario.get("endereco.cep")?.value;
      if (this.consultaCepService.consultaCEP(cep)) {
        this.inscricao3 = this.consultaCepService.consultaCEP(cep)?.subscribe(
          response => {
            this.consultaCepPreencherDados(response)
          },
          () => this.consultaCepResetarDadosFail())
      }
    } else {
      this.consultaCepResetarDadosFail();
    }
  }

  consultaCepPreencherDados(response: any): void {
    this.formulario.patchValue({
      endereco: {
        cep: response.cep,
        rua: response.logradouro,
        complemento: response.complemento,
        bairro: response.bairro,
        cidade: response.localidade,
        estado: response.uf
      }
    })
  }

  consultaCepResetarDadosFail(): void {
    this.formulario.patchValue({
      endereco: {
        cep: null,
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

  buscarEstado($event: Event) {
    console.log($event.target ? (<HTMLSelectElement>$event.target).value : '')
  }

  carregarCargos() {
    this.cargos = this.dropDownService.getCargos();
  }

  compararObjetos(obj1: any, obj2: any): boolean {
    return (obj1 && obj2) ? (obj1.nivel === obj2.nivel && obj1.desc === obj2.desc) : (obj1 === obj2);
  }

  carregarCargoSelecionado() {
    console.log(this.formulario.get('cargo')?.value)
  }

  setarCargo() {
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'}
    this.formulario.get("cargo")?.patchValue(cargo)
  }
  /*Fim -> Form 1*/

  /*xxx-----------------------------------------------------------------*/

  /*Inicio -> Form 2*/
  criandoFormBuilderReativo2() {
    this.formularioEstado = this.formularioBuilder.group({
      id: [this.estado.id],
      sigla: [this.estado.sigla],
      nome: [this.estado.nome]
    })
  }
  buscarEstadosAPI() {
    this.dropDownService.getEstadosBR().subscribe(response => {
      this.formularioEstado.patchValue(response[0])
    })
  }
  /*Fim -> Form 2*/

  validatorNgClassInput(input: string): string {
    return this.formValidatorService.validateNgClassInput(this.formSubmitted, (<FormControl>this.formulario.get(input)));
  }

  validatorNgClassLabel(input: string): string {
    return this.formValidatorService.validateNgClassLabel(this.formSubmitted, (<FormControl>this.formulario.get(input)))
  }

  validatorLabelValue(input: string, defaultMessage: string): string {
    return this.formValidatorService.validateInterpolationLabel(this.formSubmitted, (<FormControl>this.formulario.get(input)), defaultMessage)
  }

  validatorEmailInvalid(input: string): string {
    return this.formValidatorService
      .validateIsMailInvalidMessage(<FormControl>this.formulario.get(input), 'Campo Inválido')
  }

  validatorCepInvalid(input: string): string {
    // return this.formValidatorService.validateIsMinLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido')
    // return this.formValidatorService.validateIsMaxLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido')
    return this.formValidatorService
      .validateIsMinLengthOrMaxLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido');
  }


  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
    this.inscricao2?.unsubscribe();
    this.inscricao3?.unsubscribe();
    this.inscricao4?.unsubscribe();
  }
}
