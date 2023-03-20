import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  styleUrls: ['../../assets/css/pagina-inicial.min.css']
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
  tecnologias: any[] = [];
  newsletters: any[] = [];
  // frameworks: string[] = [];
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
    this.carregarTecnologias();
    this.carregarNewsLetters();
    this.criandoFormBuilderReativo2();
    this.loadFrameworksOnForm();
    this.loadTelefonesOnForm();
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
      cargo: [null, Validators.required],
      tecnologias: [null, Validators.required],
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.formularioBuilder.array([]),
      telefones: this.formularioBuilder.array([])
    })
  }

  get frameworks(): FormArray {
    return this.formulario.get('frameworks') as FormArray;
  }

  addFramework(): void {
    // const frameworkForm = new FormControl(false) //Cria um Atributo
    const frameworkForm = this.formularioBuilder.group({
      nome: [null],
      stats: [null]
    }); // Cria um Objeto
    this.frameworks.push(frameworkForm);  // Coloca um Atributo ou Um Objeto na Lista
  }

  removeFramework(frameworkIndex: number): void {
    this.frameworks.removeAt(frameworkIndex)
  }

  get telefones(): FormArray {
    return this.formulario.get('telefones') as FormArray;
  }

  addTelefone(): void {
    const telefoneForm = this.formularioBuilder.group({
      numero: [null, Validators.required],
      tipoTelefone: [null, Validators.required]
    }); // Cria um Objeto
    this.telefones.push(telefoneForm);  // Coloca um Atributo ou Um Objeto na Lista
    // let tel = this.formulario.get("telefones") as FormArray
    // console.log(tel.controls[0].get('numero'))
  }

  removeTelefone(telefoneIndex: number): void {
    this.telefones.removeAt(telefoneIndex)
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

  buscarEstado($event: Event): void {
    console.log($event.target ? (<HTMLSelectElement>$event.target).value : '')
  }

  carregarCargos(): void {
    this.cargos = this.dropDownService.getCargos();
  }

  compararObjetos(obj1: any, obj2: any): boolean {
    return (obj1 && obj2) ? (obj1.nome === obj2.nome && obj1.desc === obj2.desc) : (obj1 === obj2);
  }

  carregarCargoSelecionado(): void {
    console.log(this.formulario.get('cargo')?.value)
  }

  setarCargo(): void {
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pleno'}
    this.formulario.get("cargo")?.patchValue(cargo)
  }

  carregarTecnologias(): void {
    this.tecnologias = this.dropDownService.getTecnologias();
  }

  carregarTecnologiaSelecionado(): void {
    console.log(this.formulario.get("tecnologias")?.value)
  }

  setarTecnologias(): void {
    let tecnologias = [{nome: "php", desc: "PHP"}, {nome: "java", desc: "Java"}, {nome: "ruby", desc: "Ruby"}];
    this.formulario.get("tecnologias")?.patchValue(tecnologias)

    // Note: Algoritmo p/ verificar se dado de uma lista nao existe na lista atual, se nao incluir na lista
    // let formTecnologias: [] = (this.formulario.get("tecnologias")?.value)
    // if (formTecnologias.length > 0) {
    // Note: Algoritmo utilizando ForEach
    // formTecnologias.forEach(formTec => {
    //   let tecnologiaExiste: boolean = false;
    //   tecnologias.forEach(t => {
    //     if (formTec['nome'] === t['nome']) {
    //       tecnologiaExiste = true;
    //     }
    //   })
    //   if (!tecnologiaExiste) {
    //     tecnologias.push(formTec);
    //   }
    // })
    // Note: Algoritmo utilizando For i
    // for (let i = 0; i < formTecnologias.length; i++) {
    //   let isTecnologiaExiste: boolean = false;
    //   for (let j = 0; j < tecnologias.length; j++) {
    //     if (tecnologias[j]['nome'] === formTecnologias[i]['nome']) {
    //       isTecnologiaExiste = true
    //     }
    //   }
    //   if (!isTecnologiaExiste) {
    //     tecnologias.push(formTecnologias[i])
    //   }
    // }
    // Note: Setando valor no formulario
    // this.formulario.get("tecnologias")?.patchValue(tecnologias)
    // }
  }

  carregarNewsLetters() {
    this.newsletters = this.dropDownService.getNewsLetter();
  }

  /*Fim -> Form 1*/

  /*xxx-----------------------------------------------------------------*/

  /*Inicio -> Form 2*/
  criandoFormBuilderReativo2(): void {
    this.formularioEstado = this.formularioBuilder.group({
      id: [this.estado.id],
      sigla: [this.estado.sigla],
      nome: [this.estado.nome]
    })
  }

  buscarEstadosAPI(): void {
    this.dropDownService.getEstadosBR().subscribe(response => {
      this.formularioEstado.patchValue(response[0])
    })
  }

  loadFrameworks(): any[] {
    return this.dropDownService.getFrameworks();
  }
  loadFrameworksOnForm(): void {
    this.loadFrameworks().forEach(() => this.addFramework())
    this.frameworks.patchValue(this.loadFrameworks())
    console.log(this.frameworks.controls[0].get('nome')?.value);
  }

  loadTelefonesOnForm(): void {
    this.dropDownService.getTelefones().forEach(() => this.addTelefone())
    this.telefones.patchValue(this.dropDownService.getTelefones());
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

  validatorCheckBox(input:string): boolean {
    return this.formValidatorService.validateIsInputDirtyOrFormSubmittedReactive(this.formSubmitted, (<FormControl> this.formulario.get(input)))
  }

  validatorNgClassInputFormArray(input: string, formArrayName: string, index: number): string {
    return this.formValidatorService.validateNgClassInputFormArray(this.formulario,this.formSubmitted, formArrayName, index, input);
    // console.log(this.formulario.get("telefones")?.get("0")?.get("numero"))
    // return this.formValidatorService.validateNgClassInput(this.formSubmitted, (<FormControl>this.formulario.get(formArrayName)?.get(String(index))?.get(input)));
    // return this.formValidatorService.validateNgClassInput(this.formSubmitted,<FormControl> this.formulario.get(formArrayName).g)
  }


  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
    this.inscricao2?.unsubscribe();
    this.inscricao3?.unsubscribe();
    this.inscricao4?.unsubscribe();
  }
}
