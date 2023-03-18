import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from "@angular/forms";
import {Usuario} from "../shared/model/usuario";
import {BsLocaleService} from "ngx-bootstrap/datepicker";
import {defineLocale, ptBrLocale} from "ngx-bootstrap/chronos";
import {ConsultaCepViacepService} from "../shared/service/consulta-cep-viacep.service";
import {Subscription} from "rxjs";
import {EnvioDadosWebserviceService} from "../shared/service/envio-dados-webservice.service";

defineLocale('pt-br', ptBrLocale)

@Component({
  selector: 'app-template-form-padrao',
  templateUrl: './template-form-padrao.component.html',
  styleUrls: [
    '../../assets/css/pagina-inicial.min.css'
  ]
})
export class TemplateFormPadraoComponent implements OnInit, OnDestroy {
  disabledDates = [
    new Date(2023, 2, 12),
    new Date(2023, 2, 14)
  ];

  usuario: Usuario = new Usuario();
  inscricao?: Subscription;
  inscricao2?: Subscription;

  @ViewChild('formElement') formulario?: NgForm
  constructor(private localeService: BsLocaleService, private consultaCepService: ConsultaCepViacepService, private envioDadosService: EnvioDadosWebserviceService) {
    localeService.use('pt-br');
  }

  onSubmit(formElement: NgForm) {
    this.inscricao2 = this.envioDadosService.enviarDados(JSON.stringify(formElement.value)).subscribe(response => console.log(response));
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.formulario?.form.patchValue({nome: 'Gustavo Paco'})
    })
  }


  validatorNgClass(input: NgModel, formulario: NgForm): string {
    if (input.valid) {
      return 'is-valid'
    } else if (input.dirty && input.invalid || formulario.submitted && input.invalid) {
      return 'is-invalid'
    }
    return '';
  }

  validatorNgIfNgClassPropertyBindingSubmitted(input: NgModel, formulario: NgForm): boolean {
    return !!(formulario.submitted && input.invalid);
  }

  validatorNgIfNgClassPropertyBindingDirtyOrSubmitted(input: NgModel, formulario: NgForm): boolean {
    return !!(input.dirty && input.invalid || formulario.submitted && input.invalid);
  }

  consultaCep(event: FocusEvent, formElement: NgForm) {
    let cep = (event.target as HTMLInputElement).value;
    if (this.consultaCepService.consultaCEP(cep)) {
      this.inscricao = this.consultaCepService.consultaCEP(cep)?.subscribe(response => this.updateFormWebService(response, formElement));
    }
    this.resetFormWebService(formElement)
  }

  updateFormWebService(response: any, formElement: NgForm): void {
    if (response.erro) {
      this.resetFormWebService(formElement);
    } else {
      // Preencher Formulario
      formElement.form.patchValue({
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
  }

  resetFormWebService(formElement: NgForm) {
    formElement.form.patchValue({
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

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
    this.inscricao2?.unsubscribe();
  }
}
