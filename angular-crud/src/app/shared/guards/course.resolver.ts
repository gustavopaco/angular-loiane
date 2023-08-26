import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {CoursesService} from "../services/courses.service";
import {Course} from "../model/course";

export const COURSE_RESOLVER: ResolveFn<Course | undefined> = (route, state) => {
  if (route.params && route.params['id']) {
    const coursesService = inject(CoursesService);
    return coursesService.getById(route.params['id']);
  }
  return undefined;
};
