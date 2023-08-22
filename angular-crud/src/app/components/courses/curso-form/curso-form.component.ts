import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso-form.component.html',
  styles: [
  ]
})
export class CursoFormComponent implements OnInit {
  params!: string;
  destroyRef = inject(DestroyRef);

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getParams();
    console.log(this.params)
  }

  private getParams(): void {
    this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.params = params['id'];
    });
  }
}
