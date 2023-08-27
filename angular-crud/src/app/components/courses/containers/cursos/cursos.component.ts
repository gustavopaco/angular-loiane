import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {Course} from "../../../../shared/model/course";
import {MatCardModule} from "@angular/material/card";
import {CoursesService} from "../../../../shared/services/courses.service";
import {catchError, Observable, of, take} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../../shared/components/error-dialog/error-dialog.component";
import {MatIconModule} from "@angular/material/icon";
import {CategoryPipe} from "../../../../shared/pipes/category.pipe";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CoursesListComponent} from "../../components/courses-list/courses-list.component";
import {ToastSnakebarService} from "../../../../shared/services/toast-snakebar.service";
import {ConfirmationDialogComponent} from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatIconModule, CategoryPipe, MatButtonModule, RouterLink, CoursesListComponent],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.scss']
})
export class CursosComponent implements OnInit {
  // destroyRef = inject(DestroyRef);
  courses$: Observable<Course[]>

  constructor(private courseService: CoursesService,
              public dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastSnakeBarService: ToastSnakebarService) {
    this.courses$ = this.getCourses();
  }

  ngOnInit(): void {}

  private getCourses(): Observable<Course[]> {
    return this.courseService.getCourses().pipe(catchError(() => {
      this.onError('Erro ao carregar cursos.');
      return of([])
    }));
    // this.courseService.getCourses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    //   next: data => this.courses = data,
    //   error: err => console.log('Error', err)
    // });
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {data: message})
  }

  onAdd() {
    // console.log("Chamou o add");
    this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }

  onEdit(id: number) {
    // console.log("Chamou o edit para o id: " + id)
    this.router.navigate(['edit/', id], {relativeTo: this.activatedRoute})
  }

  onDelete(id: number) {
    // console.log("Chamou o delete para o id: " + id)
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Excluir curso', message: 'Deseja realmente excluir o curso?', btnConfirmLabel: 'Excluir', btnCancelLabel: 'Cancelar' },
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
      // disableClose: true
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe((result: boolean) => {
      if (result) {
        this.courseService.delete(id).subscribe({
          next: () => {
            this.toastSnakeBarService.success('Curso excluído com sucesso');
            this.courses$ = this.getCourses();
          },
          error: () => this.onError('Erro ao excluir curso.')
        });
      }
    });
  }
}
