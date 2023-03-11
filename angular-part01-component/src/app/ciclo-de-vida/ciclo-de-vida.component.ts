import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  Component,
  DoCheck, EventEmitter, Input,
  OnChanges,
  OnDestroy,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styles: []
})
export class CicloDeVidaComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy {

  @Input() valorInicial: number = 10;
  @Output() ciclosDeVida = new EventEmitter<string>();

  constructor() {
    this.log("Construtor");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log("ngOnChanges");
  }

  ngOnInit(): void {
    this.log("ngOnInit");
  }

  ngDoCheck(): void {
    this.log("ngDoCheck");
  }

  ngAfterContentInit(): void {
    this.log("ngAfterContentInit");
  }
  ngAfterContentChecked(): void {
    this.log("ngAfterContentChecked");
  }

  ngAfterViewChecked(): void {
    this.log("ngAfterViewChecked")
  }

  ngOnDestroy(): void {
    this.log("ngOnDestroy");
  }

  private log(value: string) {
    console.log("Filho: " + value);
    this.ciclosDeVida.emit(`Filho: ${value}`);
  }

  clicar() {
    this.valorInicial++;
  }
}
