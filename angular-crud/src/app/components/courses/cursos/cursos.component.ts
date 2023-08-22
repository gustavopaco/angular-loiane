import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {Course} from "../../../shared/model/course";
import {MatCardModule} from "@angular/material/card";
import {CoursesService} from "../../../shared/services/courses.service";
import {catchError, Observable, of} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../../shared/components/error-dialog/error-dialog.component";
import {MatIconModule} from "@angular/material/icon";
import {CategoryPipe} from "../../../shared/pipes/category.pipe";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatProgressSpinnerModule, MatDialogModule, MatIconModule, CategoryPipe, MatButtonModule, RouterLink],
  templateUrl: './cursos.component.html',
  styleUrls: ['../../../../assets/scss/cursos.scss']
})
export class CursosComponent implements OnInit {
  // destroyRef = inject(DestroyRef);
  // courses: Course[] = [];
  courses$: Observable<Course[]>
  columnsToDisplay = ['id', 'name', 'category', 'description', 'actions'];

  constructor(private courseService: CoursesService,
              public dialog: MatDialog,
              private route: Router,
              public activatedRoute: ActivatedRoute) {
    // this.courses = [];
      this.courses$ = this.courseService.getCourses().pipe(catchError(() => {
        this.onError('Erro ao carregar cursos');
        return of([])
      }));
  }

  ngOnInit(): void {

  }

  private loadCourses(): void {
    // this.courseService.getCourses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    //   next: data => this.courses = data,
    //   error: err => console.log('Error', err)
    // });
  }

  onError(message: string) {
    this.dialog.open(ErrorDialogComponent, {data: message})
  }

  onAdd() {
    this.route.navigate(['new'], {relativeTo: this.activatedRoute})
  }

  onDelete(id: number) {
    console.log("Chamou o delete para o id: " + id)
  }
}
