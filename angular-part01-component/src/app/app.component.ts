import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  DoCheck,
  OnChanges, OnDestroy,
  OnInit, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
  ]
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy{
  title = 'Titulo 1';
  valor:number = 5;
  deletarCiclo:boolean = false;
  ciclos: string[] = [];
  subscription: Subscription | undefined;
  mudarValor() {
    this.valor++;
  }

  destruirCiclo() {
    this.deletarCiclo = true;
  }

  constructor() {
    this.log("Construtor");
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log("ngOnChanges");
    console.log("ALTEROU");
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

  private log(value:string) {
    console.log("Pai: " + value)
    this.ciclos?.push(`Pai: ${value}`);
  }

  addCiclo($event: string) {
    this.ciclos?.push($event);
  }

}
