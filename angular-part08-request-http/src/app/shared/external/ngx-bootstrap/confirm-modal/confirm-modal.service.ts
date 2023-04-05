import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmModalComponent} from "./confirm-modal.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {



  constructor(private modalService: BsModalService) { }

  showConfirm(title: string, msg: string, btnSalvarTxt?: string, btnCancelTxt?: string): Subject<boolean> {
    // Ativando mostrar Modal na Tela
    const modalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);

    // Setando dados de title - corpo - textoDeBotoes para o Modal que sera renderizado
    modalRef.content.title = title;
    modalRef.content.msg = msg;
    if (btnSalvarTxt) {
      modalRef.content.btnSalvarTxt = btnSalvarTxt;
    }
    if (btnCancelTxt) {
      modalRef.content.btnCancelTxt = btnCancelTxt;
    }

    // Escutando Click dos botoes do Modal, enviando um Observable<Boolean> se o usuario clicou em salvar ou fechar o modal
    return (<ConfirmModalComponent> modalRef.content).confirmResult;
  }
}
