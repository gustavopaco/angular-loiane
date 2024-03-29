import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {CourseCategoryService} from "../../../../shared/services/course-category.service";
import {CourseCategory} from "../../../../shared/model/courseCategory";
import {FormularioDebugComponent} from "../../../../shared/components/formulario-debug/formulario-debug.component";
import {MatIconModule} from "@angular/material/icon";
import {CoursesService} from "../../../../shared/services/courses.service";
import {finalize, take} from "rxjs";
import {ToastSnakebarService} from "../../../../shared/services/toast-snakebar.service";
import {FormValidator} from "../../../../shared/validator/form-validator";
import {Lesson} from "../../../../shared/model/lesson";
import {MatTableModule} from "@angular/material/table";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule, MatButtonModule, MatSelectModule, FormularioDebugComponent, MatIconModule, MatTableModule, MatDialogModule],
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.scss']
})
export class CursoFormComponent implements OnInit {
  formulario = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    courseCategory: this.fb.group({
      id: [null, [Validators.required]]
    }),
    lessons: this.fb.array([], [Validators.required]),
  });

  destroyRef = inject(DestroyRef);
  categories: CourseCategory[] = [];

  isDisabledOnSubmit: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private courseCategoryService: CourseCategoryService,
              private courseService: CoursesService,
              private router: Router,
              private toastSnakebarService: ToastSnakebarService,
              private location: Location,
              private dialod: MatDialog) {
  }

  ngOnInit(): void {
    this.addLesson();
    this.getCourseCategories();
    this.onEdit();
  }

  get lessons(): FormArray {
    return this.formulario.get('lessons') as FormArray;
  }

  addLesson(lesson?: Lesson) {
    const lessonForm = this.fb.group({
      id: [lesson?.id],
      name: [lesson?.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      youtubeUrl: [lesson?.youtubeUrl, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
    this.lessons.push(lessonForm);
  }

  private loadLessons(lessons: Lesson[]) {
    this.lessons.clear();
    lessons.forEach(lesson => {
      this.addLesson(lesson);
    });
  }

  removeLesson(index: number) {
    const matDialogRef = this.dialod.open(ConfirmationDialogComponent, {
      data: {
        title: 'Excluir Aula',
        message: 'Deseja realmente excluir a aula?',
        btnConfirmLabel: 'Excluir',
        btnCancelLabel: 'Cancelar'
      },
      enterAnimationDuration: 300,
      exitAnimationDuration: 300,
    });

    matDialogRef.afterClosed().pipe(take(1)).subscribe((result: boolean) => {
      if (result) {this.lessons.removeAt(index);}
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
    if (this.formulario.valid) {
      this.isDisabledOnSubmit = true;
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
    if (!this.activatedRoute.snapshot.params['id']) return;
    this.activatedRoute.data.pipe(take(1)).subscribe({
      next: (data) => {
        if (data['course']) {
          this.formulario.patchValue(data['course']);
          this.loadLessons(data['course'].lessons.sort((a : Lesson, b : Lesson) => a.id - b.id));
        }
      },
      error: () => this.toastSnakebarService.error('Erro ao carregar curso!')
    });
  }

  matErrorMessage(formControlName: string, inputName: string, inputNameEqualsTo?: string): string {
    return FormValidator.validateSmallGenericInterpolation(<FormControl>this.formulario.get(formControlName), inputName, inputNameEqualsTo);
  }

  matErrorFormArrayMessage(formControlName: string, itemFormArray: AbstractControl, inputName: string): string {
    return FormValidator.validateFormArraySmallGenericInterpolation(formControlName, inputName, itemFormArray);
  }

  isMatErrorFormArrayRequired(): boolean {
    return this.lessons.invalid && this.lessons.hasError('required');
  }
}
