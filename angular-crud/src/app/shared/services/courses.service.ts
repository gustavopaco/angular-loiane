import {Injectable} from '@angular/core';
import {Course} from '../model/course';
import {HttpClient} from "@angular/common/http";
import {delay, Observable, take, tap} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = `${environment.API}/courses`

  constructor(private httpClient: HttpClient) {
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API)
      .pipe(
        take(1),
        delay(2000),
        //tap(console.log)
      );
    // return [
    //   {id: 1, name: 'Angular', category: 'Front-end', description: 'Curso de Angular 16'},
    //   {id: 2, name: 'Java', category: 'Back-end', description: 'Curso de Java Avançado'},
    //   {id: 3, name: 'Spring', category: 'Back-end', description: 'Curso de Spring Boot v3'},
    //   {id: 4, name: 'React', category: 'Front-end', description: 'Curso de React JS'},
    //   {id: 5, name: 'Vue', category: 'Front-end', description: 'Curso de Vue JS'},
    // ];
  }

  getById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.API}/${id}`).pipe(take(1));
  }

  save(record: any): Observable<void> {
    if (record['id']) {
        return this.update(record);
    }
    return this.create(record);
  }

  private create(record: any): Observable<void> {
    return this.httpClient.post<void>(this.API, record).pipe(take(1));
  }

  private update(record: any): Observable<void> {
    return this.httpClient.put<void>(`${this.API}/${record['id']}`, record).pipe(take(1));
  }
}
