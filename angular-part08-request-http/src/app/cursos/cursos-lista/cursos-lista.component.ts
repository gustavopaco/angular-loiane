import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CursosService} from "../../shared/service/cursos.service";
import {Curso} from "../../shared/model/Curso";
import {catchError, EMPTY, Observable, of, Subject, Subscription, switchMap, take} from "rxjs";
import {AlertModalUtilService} from "../../shared/external/ngx-bootstrap/alert-modal/alert-modal-util.service";
import {ToastMessageService} from "../../shared/external/ngx-toastr/toast-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmModalService} from "../../shared/external/ngx-bootstrap/confirm-modal/confirm-modal.service";

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: []
})
export class CursosListaComponent implements OnInit, OnDestroy {

  cursos: Curso[] = [];
  cursos$?: Observable<Curso[]>;
  error$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = true;
  isError: boolean = false;

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') modal!: TemplateRef<any>;

  cursoSelecionado?: Curso;

  inscricao: Subscription[] = [];

  constructor(private cursosService: CursosService,
              private modalUtilService: AlertModalUtilService,
              private toastMessage: ToastMessageService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private bsModalService: BsModalService,
              private confirmModalService: ConfirmModalService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.onRefresh();
    // this.cursosService.getCursos().subscribe(response => this.cursos = response)
  }

  onRefresh() {
    /*Note: Exemplo de Captura de Mensagem de Erro utilizando Async*/
    this.cursos$ = this.cursosService.getRecords()
      .pipe(
        catchError((err: any) => {
          console.log(err)
          this.dispararErro();
          // this.error$.next(true);
          return of();
        }),
      );
    /*Note: Exemplo de Captura de Mensagem de Erro utilizando Subscribe*/
    // this.cursosService.getCursos().pipe(take(1)).subscribe(
    //   {
    //     next: (response) => {
    //       this.isError = false;
    //       this.cursos = response;
    //     },
    //     error: (error) => {
    //       this.isError = true;
    //     }
    //   }
    // ).add(() => this.isLoading = false)
  }

  onEdit(id?: number): void {
    this.router.navigate(["editar/", id], {relativeTo: this.activatedRouter})
  }

  onDeleteSubject(curso: Curso) {
    this.cursoSelecionado = curso;
    const result$ = this.confirmModalService.showConfirm('Confirmação', 'Tem certeza que deseja deletar?')
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(confirmation => confirmation ? this.cursosService.removeRecord(<number>this.cursoSelecionado?.id) : EMPTY)
      )
      .subscribe({
        next: response => {
          this.onRefresh();
          setTimeout(() => this.modalUtilService.mostrarModalAlertaSuccess("Curso deletado com sucesso"), 1000)
        },
        error: err => this.modalUtilService.mostrarModalAlertaDanger("Erro ao remover curso, tente mais tarde")
      })
  }

  // Note: Codigo nao utilizado pois metodo para delete sendo chamado agora é o "onDeleteSubject" que usa um Modal generico
  onDeleteBasic(curso: Curso) {
    this.cursoSelecionado = curso
    this.deleteModalRef = this.bsModalService.show(this.modal, {class: 'modal-sm'})
  }

  // Note: Codigo nao utilizado pois metodo para delete sendo chamado agora é o "onDeleteSubject" que usa um Modal generico
  onConfirmDelete() {
    this.deleteModalRef?.hide();
    if (this.cursoSelecionado?.id) {
      this.cursosService.removeRecord(this.cursoSelecionado.id)
        .subscribe({
          next: () => {
            this.onRefresh();
            setTimeout(() => this.modalUtilService.mostrarModalAlertaSuccess("Curso deletado com sucesso"), 1000)

          },
          error: err => this.modalUtilService.mostrarModalAlertaDanger("Erro ao remover curso, tente mais tarde")
        })
    }

  }

  // Note: Codigo nao utilizado pois metodo para delete sendo chamado agora é o "onDeleteSubject" que usa um Modal generico
  onDeclineDelete() {

  }

  dispararErro(): void {
    this.modalUtilService.mostrarModalAlertaDanger("Erro ao carregar cursos. Tente novamente mais tarde.")
    // this.toastMessage.successMessage("Erro ao carregar cursos. Tente novamente mais tarde.", "Ola Mundo")
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(s => s.unsubscribe())
  }
}
