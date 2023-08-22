import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule, MatButtonModule],
  templateUrl: './curso-form.component.html',
  styleUrls: ['../../../../assets/scss/curso-form.scss']
})
export class CursoFormComponent implements OnInit {
  params!: string;
  destroyRef = inject(DestroyRef);
  formulario!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getParams();
    this.createForm();
  }

  private getParams(): void {
    this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.params = params['id'];
    });
  }

  private createForm(): void {
    this.formulario = this.fb.group({
      id: [null, []],
      name: [null, []],
      description: [null, []],
      courseCategory: this.fb.group({
        id: [null, []],
        name: [null, []],
      })
    });
  }

  onCancel() {

  }
}
