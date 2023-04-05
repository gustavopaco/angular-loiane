import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidator} from "../../shared/validator/form-validator";
import {CursosService} from "../../shared/service/cursos.service";
import {Curso} from "../../shared/model/Curso";
import {ToastMessageService} from "../../shared/external/ngx-toastr/toast-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Subscription, switchMap} from "rxjs";
import {AlertModalUtilService} from "../../shared/external/ngx-bootstrap/alert-modal/alert-modal-util.service";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['../../../assets/css/pagina-inicial.min.css'
  ]
})
export class CursosFormComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  isFormSubmitted: boolean = false;
  pathVariable?: string;

  curso: Curso = new Curso();
  inscricao: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private toastMessage: ToastMessageService,
    private alertModal: AlertModalUtilService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getcursoGuardResolver();
    this.formularioBuilder();
    // this.getPathVariable();
  }

  private getcursoGuardResolver() {
    // return  this.activatedRouter.snapshot.data['curso'];
    this.activatedRouter.data.subscribe(response => {
      this.curso = response['curso'];
    })
  }

  formularioBuilder() {
    this.formulario = this.fb.group({
      id: [this.curso.id],
      nome: [this.curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    })
    this.inscricao.push(this.formulario.valueChanges.subscribe(formValue => this.curso = formValue))
  }

  // Note: Metodo nao esta sendo utilizado pois o Guarda de Rotas "Resolve" ja esta obtendo o parametro da Rota buscando retornando Observable de LoadByCursos
  private getPathVariable() {
    this.inscricao.push(this.activatedRouter.params
      .pipe(
        map((params: any) => params['id']),
        switchMap((id: any) => this.cursosService.loadById(id))
      )
      .subscribe({
        next: curso => {
          this.updateForm(curso);
        }
      }))
  }

  private updateForm(curso: Curso): void {
    this.formulario.patchValue({
      id: curso.id,
      nome: curso.nome
    })
  }

  onSubmit() {
    this.isFormSubmitted = true
    console.log(this.formulario.value)
    if (this.formulario.valid) {
      this.cursosService.saveRecord(this.formulario.value).subscribe({
        next: () => {
          if (this.formulario.value.id) {
            this.alertModal.mostrarModalAlertaSuccess("Curso atualizado com sucesso.")
          } else {
            this.alertModal.mostrarModalAlertaSuccess("Novo curso criado com sucesso.")
          }
          this.router.navigate(['/cursos'])
        },
        error: () => {
          if (this.formulario.value.id) {
          this.alertModal.mostrarModalAlertaDanger("Erro ao fazer update no curso.")
          } else {
          this.alertModal.mostrarModalAlertaDanger("Erro ao cadastrar curso.")
          }
        }
      })
    }
  }

  onCancel() {
    this.isFormSubmitted = false;
    this.formulario.reset();
  }

  validatorInputNgClass(input: string) {
    return FormValidator.validateInputNgClass(this.isFormSubmitted, <FormControl>this.formulario.get(input))
  }

  validatorSmallGenericMessage(input: string, inputName: string) {
    return FormValidator.validateSmallGenericMessage(<FormControl>this.formulario.get(input), inputName)
  }

  validatorLabelNgClass(input: string) {
    return FormValidator.validateLabelNgClass(this.isFormSubmitted, <FormControl>this.formulario.get(input))
  }

  validatorLabelInterpolation(input: string, inputName: string) {
    return FormValidator.validateLabelInterpolation(this.isFormSubmitted, <FormControl>this.formulario.get(input), inputName)
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(i => i.unsubscribe());
  }
}
