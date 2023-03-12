import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {CiclosVidaService} from "../shared/ciclos-vida.service";

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styles: []
})
export class CicloDeVidaComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy {

  @Input() valorInicial: number = 10;

  // @Output() ciclosDeVida = new EventEmitter<string>();

  constructor(private ciclosVidaService: CiclosVidaService) {
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
    this.ciclosVidaService.addCiclo(`Filho: ${value}`);
    // this.ciclosDeVida.emit(`Filho: ${value}`);
  }

  clicar() {
    this.ciclosVidaService.resetCiclo();
    this.valorInicial++;
  }
}
