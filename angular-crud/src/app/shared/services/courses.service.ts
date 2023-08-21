import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, take, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'assets/data/courses.json'

  constructor(private request: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.request.get<Course[]>(this.API)
      .pipe(
        take(1),
        delay(2000),
        tap(console.log)
      );
    // return [
    //   {id: 1, name: 'Angular', category: 'Front-end', description: 'Curso de Angular 16'},
    //   {id: 2, name: 'Java', category: 'Back-end', description: 'Curso de Java Avançado'},
    //   {id: 3, name: 'Spring', category: 'Back-end', description: 'Curso de Spring Boot v3'},
    //   {id: 4, name: 'React', category: 'Front-end', description: 'Curso de React JS'},
    //   {id: 5, name: 'Vue', category: 'Front-end', description: 'Curso de Vue JS'},
    // ];
  }
}
