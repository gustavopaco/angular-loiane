import {CourseCategory} from "./courseCategory";
import {Lesson} from "./lesson";

export interface Course {
  id: number;
  name: string;
  description: string;
  courseCategory: CourseCategory;
  lessons: Lesson[];
}
