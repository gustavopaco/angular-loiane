import {CourseCategory} from "./courseCategory";

export interface Course {
  id: number;
  name: string;
  description: string;
  courseCategory: CourseCategory;
}
