import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EnvioDadosWebserviceService} from "../shared/service/envio-dados-webservice.service";
import {empty, map, Subscription, switchMap} from "rxjs";
import {Usuario} from "../shared/model/usuario";
import {ConsultaCepViacepService} from "../shared/service/consulta-cep-viacep.service";
import {DropdownService} from "../shared/service/dropdown.service";
import {Estado} from "../shared/model/estado";
import {VerificaEmailService} from "../shared/service/verifica-email.service";
import {FormValidator} from "../shared/validator/form-validator";
import {Cidade} from "../shared/model/cidade";

@Component({
  selector: 'app-data-form-reativo',
  templateUrl: './data-form-reativo.component.html',
  styleUrls: ['../../assets/css/pagina-inicial.min.css']
})
export class DataFormReativoComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  formularioEstado!: FormGroup;
  // estado: Estado = new Estado();
  formSubmitted: boolean = false;
  usuario: Usuario = new Usuario();
  cidades?: Cidade[] =[]
  estados: Estado[] = [];
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
    private consultaCepService: ConsultaCepViacepService,
    private dropDownService: DropdownService,
    private verificaEmailService: VerificaEmailService
  ) {
  }

  ngOnInit(): void {
    this.loadData();
    this.criandoFormBuilderReativo();
    this.loadDataOnForm();
    this.mapFormToObject();
    this.criandoFormBuilderReativo2();
  }

  /*Inicio -> Form 1*/
  criandoFormBuilderReativo(): void {
    this.formulario = this.formularioBuilder.group({
      nome: [this.usuario.nome, [Validators.required, Validators.min(6), Validators.max(10)]],
      email: [this.usuario.email, [Validators.required, Validators.email], [FormValidator.formBuilderValidateEmailAsync(this.verificaEmailService)]],
      confirmarEmail: [this.usuario.email, [Validators.required, FormValidator.formBuilderValidateEqualsTo('email')]],
      endereco: this.formularioBuilder.group({
        cep: [this.usuario.endereco.cep, [Validators.required, FormValidator.formBuilderValidateCep]],
        numero: [this.usuario.endereco.numero, Validators.required],
        complemento: [this.usuario.endereco.complemento],
        rua: [this.usuario.endereco.rua, Validators.required],
        bairro: [this.usuario.endereco.bairro, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required],
      }),
      cargo: [null, Validators.required],
      tecnologias: [null, Validators.required],
      linguas: this.formularioBuilder.array([], FormValidator.formBuilderValidateMinCheckBox(1)),
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.formularioBuilder.array([]),
      telefones: this.formularioBuilder.array([])
    })
  }

  loadData(): void {
    this.carregarEstados();
    this.carregarCargos();
    this.carregarTecnologias();
    this.carregarNewsLetters();
  }

  loadDataOnForm():void {
    this.loadLinguasOnForm();
    this.loadFrameworksOnForm();
    this.loadTelefonesOnForm();
    this.listenForm();
  }

  mapFormToObject(): void {
    this.inscricao2 = this.formulario.valueChanges.subscribe(form => {
      this.usuario = form;
    })
  }

  get linguas(): FormArray {
    return this.formulario.get("linguas") as FormArray
  }

  addLingua() {
    const linguaForm = new FormControl(false);
    this.linguas.push(linguaForm);
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

  listenForm() {
    this.formulario.get("endereco.estado")?.valueChanges
      .pipe(
        map((estado => this.estados.filter(e => e.sigla == estado))),
        map(e => e && e.length > 0 ? e[0].id: empty()),
        switchMap(estadoId => this.dropDownService.getCidades(<string>estadoId)),
      )
      .subscribe(response => this.cidades = response)
  }

  // Note: Pode ser feito utilizando Observable e utilizando Pipe Async no HTML
  carregarEstados(): void {
    this.dropDownService.getEstadosBR().subscribe(response => this.estados = response);
  }

  onSubmit(): void {
    // Método Object.assign cria um objeto vazio com o valor do formulário
    let formFiltrado = Object.assign({}, this.formulario.value);
    // Agora vamos reescrever o objeto formFiltrado
    formFiltrado = Object.assign(formFiltrado, {

      // Reescrevendo o atributo “linguas” do FormFiltrado.
      // Setando no atributo “linguas” do FormFiltrado o valor do atributo “linguas” do Formulario
      linguas: this.formulario.get("linguas")?.value
        // Mapeando pelo itemLista = true ou seja, se True retorna a string da lista de lingua,
        // baseado no index que o usuário marcou true na tela, se nao retorna null
        .map((itemLista: boolean, i: any) => itemLista ? this.loadLinguas().at(i) : null)
        // Filtrando por somente valores diferente de null, com isso vai restar somente um array de strings das linguas selecionadas
        .filter((lingua: any) => lingua != null),

      // Reescrevendo o atributo “frameworks” do FormFiltrado.
      // Setando no atributo “frameworks” do FormFiltrado o valor do atributo “frameworks” do Formulario
      frameworks: this.formulario.get("frameworks")?.value
        // Mapeado pelo obj.stats = true ou seja, retorna o objeto que o usuário marcou, se nao retorna null
        .map((obj: any, i: any) => obj.stats ? obj : null)
        // Filtrando por somente valores diferente de null, com isso vai restar somente objetos que foram marcados true
        .filter((obj: any) => obj != null)
    })
    console.log(`Checkbox Filtrada:`)
    console.log(formFiltrado)
    this.formSubmitted = true;
    console.log(this.formulario)
    if (this.formulario.valid) {
      this.inscricao = this.envioDadosWebService.enviarDados(JSON.stringify(formFiltrado)).subscribe({
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
      console.log("Chamou")
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

  carregarCargos(): void {
    this.cargos = this.dropDownService.getCargos();
  }

  compararObjetos(obj1: any, obj2: any): boolean {
    return (obj1 && obj2) ? (obj1.nome === obj2.nome && obj1.desc === obj2.desc) : (obj1 === obj2);
  }

  compararCidade(obj1: any, obj2: any): boolean {
    return (obj1 && obj2) ? (obj1.nome === obj2.nome) : (obj1 === obj2);
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

  loadLinguas(): string[] {
    return this.dropDownService.getLinguas();
  }

  loadLinguasOnForm(): void {
    this.loadLinguas().forEach(() => this.addLingua());
  }

  carregarNewsLetters() {
    this.newsletters = this.dropDownService.getNewsLetter();
  }

  /*Fim -> Form 1*/

  /*xxx-----------------------------------------------------------------*/

  /*Inicio -> Form 2*/
  criandoFormBuilderReativo2(): void {
    this.formularioEstado = this.formularioBuilder.group({
      id: [null],
      sigla: [null],
      nome: [null]
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
    // console.log(this.frameworks.controls[0].get('nome')?.value);
  }

  loadTelefonesOnForm(): void {
    this.dropDownService.getTelefones().forEach(() => this.addTelefone())
    this.telefones.patchValue(this.dropDownService.getTelefones());
  }

  /*Fim -> Form 2*/

  validatorNgClassInput(input: string): string {
    return FormValidator.validateNgClassInput(this.formSubmitted, (<FormControl>this.formulario.get(input)));
  }

  validatorNgClassInputPENDING(input: string): string {
    return FormValidator.validateNgClassInputPENDING(this.formSubmitted, (<FormControl>this.formulario.get(input)));
  }

  validatorNgClassLabel(input: string): string {
    return FormValidator.validateNgClassLabel(this.formSubmitted, (<FormControl>this.formulario.get(input)))
  }

  validatorNgClassSmall(input: string): string {
    return FormValidator.validateNgClassSmall(<FormControl>this.formulario.get(input))
  }

  validatorGenericSmallMessage(input: string, inputName: string,  inputNameEqualsTo?: string): string {
    return FormValidator.validateGenericSmallMessage(<FormControl> this.formulario.get(input), inputName, inputNameEqualsTo)
  }

  validatorLabelValue(input: string, defaultMessage: string): string {
    return FormValidator.validateInterpolationLabel(this.formSubmitted, (<FormControl>this.formulario.get(input)), defaultMessage)
  }

  validatorEmailInvalid(input: string): string {
    return FormValidator.validateCustomEmailInUse(<FormControl>this.formulario.get(input), 'Campo Inválido');
    // return FormValidator.validateIsMailInvalidMessage(<FormControl>this.formulario.get(input), 'Campo Inválido');
  }

  validatorCepInvalid(input: string): string {
    return FormValidator.validateCustomIsCepInvalidMessage(<FormControl>this.formulario.get(input), "Campo Inválido")
    // return this.formValidatorService.validateIsMinLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido')
    // return this.formValidatorService.validateIsMaxLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido')
    // return this.formValidatorService
    //   .validateIsMinLengthOrMaxLengthMessage(<FormControl>this.formulario.get(input), 'Campo Inválido');
  }

  validatorCheckBox(input: string): boolean {
    return FormValidator.validateIsInputDirtyOrFormSubmittedReactive(this.formSubmitted, (<FormControl>this.formulario.get(input)))
  }

  validatorNgClassInputFormArray(input: string, itemFormArray: AbstractControl): string {
    // console.log(this.telefones.get("0")?.get("numero"))
    // console.log(itemFormArray.get("numero")?.value)
    return FormValidator.validateNgClassInputFormArray(input, this.formSubmitted, itemFormArray);
    // console.log(this.formulario.get("telefones")?.get("0")?.get("numero"))
    // return this.formValidatorService.validateNgClassInput(this.formSubmitted, (<FormControl>this.formulario.get(formArrayName)?.get(String(index))?.get(input)));
    // return this.formValidatorService.validateNgClassInput(this.formSubmitted,<FormControl> this.formulario.get(formArrayName).g)
  }

  validatorNgClassMinCheckBox(): string {
    return FormValidator.validateCustomNgClassMinCheckBox(this.formSubmitted, this.linguas);
  }

  validatorIsEqualsToMessage(input: string): string {
    return FormValidator.validateCustomIsEqualsToMessage(<FormControl>this.formulario.get(input), "Campo Inválido")
  }


  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
    this.inscricao2?.unsubscribe();
    this.inscricao3?.unsubscribe();
    this.inscricao4?.unsubscribe();
  }

}
