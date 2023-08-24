import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryPipe} from "../../../../shared/pipes/category.pipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {Course} from "../../../../shared/model/course";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, CategoryPipe, MatButtonModule, MatIconModule, MatTableModule, RouterLink],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.scss']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  columnsToDisplay = ['id', 'name', 'category', 'description', 'actions'];

  constructor() {
    // this.courses = [];
  }

  onDelete(id: number) {
    console.log("Chamou o delete para o id: " + id)
  }

  onAdd() {
    // this.route.navigate(['new'], {relativeTo: this.activatedRoute})
  }
}
