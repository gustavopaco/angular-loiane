import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CourseCategory} from "../model/courseCategory";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {
  private readonly API = `${environment.API}/course-category`;

  constructor(private httpClient: HttpClient) { }

  getCourseCategories(): Observable<CourseCategory[]> {
    return this.httpClient.get<CourseCategory[]>(this.API).pipe(take(1));
  }
}
