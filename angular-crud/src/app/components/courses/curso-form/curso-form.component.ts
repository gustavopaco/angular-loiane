import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {CourseCategoryService} from "../../../shared/services/course-category.service";
import {CourseCategory} from "../../../shared/model/courseCategory";
import {FormularioDebugComponent} from "../../../shared/components/formulario-debug/formulario-debug.component";
import {MatIconModule} from "@angular/material/icon";
import {CoursesService} from "../../../shared/services/courses.service";
import {finalize} from "rxjs";
import {ToastSnakebarService} from "../../../shared/services/toast-snakebar.service";

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule, MatButtonModule, MatSelectModule, FormularioDebugComponent, MatIconModule],
  templateUrl: './curso-form.component.html',
  styleUrls: ['../../../../assets/scss/curso-form.scss']
})
export class CursoFormComponent implements OnInit {
  params!: string;
  destroyRef = inject(DestroyRef);
  formulario!: FormGroup;
  categories: CourseCategory[] = [];

  isDisabledOnSubmit: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private courseCategoryService: CourseCategoryService,
              private courseService: CoursesService,
              private router: Router,
              private toastSnakebarService: ToastSnakebarService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getParams();
    this.createForm();
    this.getCourseCategories();
    this.onEdit();
  }

  private getParams(): void {
    this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.params = params['id'];
    });
  }

  private createForm(): void {
    this.formulario = this.fb.group({
      id: [null, []],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      courseCategory: [null, [Validators.required]],
      // courseCategory: this.fb.group({
      //   id: [null, [Validators.required]],
      //   name: [null, [Validators.required]],
      // })
    });
  }

  onCancel() {
    this.location.back();
  }

  private getCourseCategories() {
    this.courseCategoryService.getCourseCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  compareObj(o1: any, o2: any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onSubmit() {
    this.isDisabledOnSubmit = true;
    if (this.formulario.valid) {
      this.courseService.save(this.formulario.value)
        .pipe(finalize(() => this.isDisabledOnSubmit = false))
        .subscribe({
          next: () => {
            this.onSaved();
          },
          error: (err) => this.toastSnakebarService.error(err.message)
        });
    }
  }

  private onSaved() {
    if (this.formulario.value.id) {
      this.toastSnakebarService.success('Curso atualizado com sucesso!')
    } else {
      this.toastSnakebarService.success('Curso salvo com sucesso!')
    }
    this.router.navigate(['/courses']);
  }

  private onEdit() {
    if (this.params) {
      this.courseService.getById(Number(this.params)).subscribe(course => {
        this.formulario.patchValue(course);
      });
    }
  }
}
