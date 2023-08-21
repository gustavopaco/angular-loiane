import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {Course} from "../../../shared/model/course";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './cursos.component.html',
  styles: []
})
export class CursosComponent {
  courses: Course[] = [
    {id: 1, name: 'Angular', category: 'Front-end', description: 'Curso de Angular 16'},
    {id: 2, name: 'Java', category: 'Back-end', description: 'Curso de Java Avançado'},
    {id: 3, name: 'Spring', category: 'Back-end', description: 'Curso de Spring Boot v3'},
    {id: 4, name: 'React', category: 'Front-end', description: 'Curso de React JS'},
    {id: 5, name: 'Vue', category: 'Front-end', description: 'Curso de Vue JS'},
  ];
  columnsToDisplay = ['id', 'name', 'category', 'description'];

  constructor() {
    // this.courses = [];
  }
}
