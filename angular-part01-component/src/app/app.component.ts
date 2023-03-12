import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked, ChangeDetectorRef,
  Component,
  DoCheck,
  OnChanges, OnDestroy,
  OnInit, SimpleChanges
} from '@angular/core';
import {CiclosVidaService} from "./shared/ciclos-vida.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy {
  title = 'Titulo 1';
  valor: number = 5;
  deletarCiclo: boolean = false;
  ciclos?: string[];
  passou = false;

  constructor(private ciclosVidaService: CiclosVidaService, private changeDetection: ChangeDetectorRef) {
    this.log("Construtor");
    this.passou = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.log("ngOnChanges");
    console.log("ALTEROU");
  }

  ngOnInit(): void {
    this.ciclosVidaService.getNotification().subscribe(response => {
      this.ciclos = response;

    })
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

  private log(value: string): void {
    console.log("Pai: " + value)
    this.ciclosVidaService.addCiclo(`Pai: ${value}`);
    if (this.passou) {
      this.changeDetection.detectChanges();
    }
  }

  mudarValor(): void {
    this.ciclosVidaService.isChanged = true;
    if (this.ciclosVidaService.isChanged) {
      this.ciclosVidaService.resetCiclo();
      console.log(this.ciclosVidaService.getCiclos())
    }
    this.valor++;
  }

  destruirCiclo() {
    this.deletarCiclo = true;
  }

  public trackItem(index: number, item: any) {
    return item.trackId;
  }
}
