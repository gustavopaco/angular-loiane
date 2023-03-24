import {Component, OnDestroy, OnInit} from '@angular/core';
import {CursosService} from "../../shared/service/cursos.service";
import {Curso} from "../../shared/model/Curso";
import {catchError, Observable, of, Subject, Subscription} from "rxjs";
import {AlertModalUtilService} from "../../shared/alert-modal/alert-modal-util.service";
import {ToastMessageService} from "../../shared/service/toast-message.service";

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
  inscricao: Subscription[] = [];

  constructor(private cursosService: CursosService, private modalUtilService: AlertModalUtilService, private toastMessage: ToastMessageService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.onRefresh();
    // this.cursosService.getCursos().subscribe(response => this.cursos = response)
  }

  onRefresh() {
    /*Note: Exemplo de Captura de Mensagem de Erro utilizando Async*/
    this.cursos$ = this.cursosService.getCursos()
      .pipe(
        catchError((err:any) => {
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

  dispararErro(): void {
    this.modalUtilService.mostrarModalAlertaDanger("Erro ao carregar cursos. Tente novamente mais tarde.")
    // this.toastMessage.successMessage("Erro ao carregar cursos. Tente novamente mais tarde.", "Ola Mundo")
  }

  ngOnDestroy(): void {
    this.inscricao.forEach(s => s.unsubscribe())
  }
}
