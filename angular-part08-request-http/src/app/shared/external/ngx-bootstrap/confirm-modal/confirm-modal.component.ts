import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Subject} from "rxjs";

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styles: []
})
export class ConfirmModalComponent implements OnInit {

  @Input() title?: string;
  @Input() msg?: string;
  @Input() btnSalvarTxt?: string = 'Salvar';
  @Input() btnCancelTxt?: string = 'Cancelar';

  confirmResult: Subject<boolean> = new Subject<boolean>();

  constructor(private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}
