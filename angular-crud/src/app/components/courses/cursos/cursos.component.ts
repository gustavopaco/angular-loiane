import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {Course} from "../../../shared/model/course";
import {MatCardModule} from "@angular/material/card";
import {CoursesService} from "../../../shared/services/courses.service";
import {Observable, take} from "rxjs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['../../../../assets/scss/cursos.scss']
})
export class CursosComponent implements OnInit {
  // destroyRef = inject(DestroyRef);
  // courses: Course[] = [];
  courses$: Observable<Course[]>
  columnsToDisplay = ['id', 'name', 'category', 'description'];

  constructor(private courseService: CoursesService) {
    // this.courses = [];
      this.courses$ = this.courseService.getCourses();
  }

  ngOnInit(): void {

  }

  private loadCourses(): void {
    // this.courseService.getCourses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    //   next: data => this.courses = data,
    //   error: err => console.log('Error', err)
    // });
  }
}
