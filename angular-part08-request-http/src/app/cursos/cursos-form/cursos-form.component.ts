import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormValidator} from "../../shared/validator/form-validator";
import {CursosService} from "../../shared/service/cursos.service";
import {Curso} from "../../shared/model/Curso";
import {ToastMessageService} from "../../shared/service/toast-message.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AlertModalUtilService} from "../../shared/alert-modal/alert-modal-util.service";

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['../../../assets/css/pagina-inicial.min.css'
  ]
})
export class CursosFormComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;
  isFormSubmitted: boolean = false;
  curso: Curso = new Curso();
  inscricao: Subscription[]=[];

  constructor(
    private fb: FormBuilder,
    private cursosService: CursosService,
    private toastMessage: ToastMessageService,
    private alertModal: AlertModalUtilService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formularioBuilder();
  }

  formularioBuilder() {
    this.formulario = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    })
    this.inscricao.push(this.formulario.valueChanges.subscribe(formValue => this.curso = formValue))
  }

  onSubmit() {
    this.isFormSubmitted = true
    console.log(this.formulario.value)
    if (this.formulario.valid) {
      this.cursosService.addCurso(this.curso).subscribe({
        next: () => {
          // this.toastMessage.successMessage("Novo curso cadastrado com sucesso");
          this.alertModal.mostrarModalAlertaSuccess("Novo curso cadastrado com sucesso",3000);
          this.router.navigate(['/cursos'])
        },
        error: (err) => {
          this.toastMessage.errorMessage("Erro ao cadastrar um novo curso");
          console.log(err)
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
