import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertModalComponent} from "./external/ngx-bootstrap/alert-modal/alert-modal.component";


@NgModule({
  declarations: [
    AlertModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
