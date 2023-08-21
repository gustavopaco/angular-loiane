import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {Course} from "../../../shared/model/course";
import {MatCardModule} from "@angular/material/card";
import {CoursesService} from "../../../shared/services/courses.service";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './cursos.component.html',
  styles: []
})
export class CursosComponent implements OnInit {
  courses: Course[] = [];
  columnsToDisplay = ['id', 'name', 'category', 'description'];

  constructor(private courseService: CoursesService) {
    // this.courses = [];
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.courses = this.courseService.getCourses();
  }
}
