import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-curso-not-found',
  templateUrl: './curso-not-found.component.html',
  styles: [
  ]
})
export class CursoNotFoundComponent implements OnInit, OnDestroy{

  id?: string;
  inscricao?: Subscription;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.inscricao = this.activatedRoute.params.subscribe((param: any) => this.id = param['id']);
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe()
  }

}
