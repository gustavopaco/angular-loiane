import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private request: HttpClient) { }

  getCourses(): Course[]{
    return [
      {id: 1, name: 'Angular', category: 'Front-end', description: 'Curso de Angular 16'},
      {id: 2, name: 'Java', category: 'Back-end', description: 'Curso de Java Avançado'},
      {id: 3, name: 'Spring', category: 'Back-end', description: 'Curso de Spring Boot v3'},
      {id: 4, name: 'React', category: 'Front-end', description: 'Curso de React JS'},
      {id: 5, name: 'Vue', category: 'Front-end', description: 'Curso de Vue JS'},
    ];
  }
}
