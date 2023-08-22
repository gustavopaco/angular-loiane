import {CourseCategory} from "./courseCategory";

export interface Course {
  id: number;
  name: string;
  category: string;
  description: string;
  courseCategory: CourseCategory;
}
