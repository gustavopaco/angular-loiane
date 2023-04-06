import {Component, OnInit} from '@angular/core';
import {UploadFileService} from "../shared/service/upload-file.service";
import {FileBase64Service} from "../shared/service/file-base64.service";
import {environment} from "../../environments/environment";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {fileUploadFiltrarUploadCompleto, fileUploadProgressoAtual} from "../shared/constant/file-upload-rxjs-operator";
import {fileDownloadFromBlobAndContentTypeOnHeader, fileDownloadFromBlob} from "../shared/constant/file-download";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styles: []
})
export class UploadFileComponent implements OnInit {

  files: Set<File> = new Set<File>();
  progressoUpload?: number = 0;

  constructor(private uploadFileService: UploadFileService,
              private fileBase64Service: FileBase64Service) {
  }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    this.progressoUpload = 0;
    // console.log(((<HTMLInputElement>event.target).files as FileList).item(0))
    let fileList = ((<HTMLInputElement>event.target).files as FileList)

    if (!this.fileBase64Service.isDuplicatedFile(this.files, fileList[0])) {
      for (let i = 0; i < fileList.length; i++) {
        this.files?.add(fileList[i]);
        console.log(this.files)
      }
    }
  }

  onUploadCustomRxJsOperators() {
    if (this.files && this.files.size > 0) {
      this.uploadFileService.uploadFile(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          fileUploadProgressoAtual(porcentagemAtual => {
            console.log(porcentagemAtual);
            this.progressoUpload = porcentagemAtual;
          }),
          fileUploadFiltrarUploadCompleto()
        ).subscribe(() => {
        console.log('Upload concluido')
        this.files = new Set<File>();
      })
    }
  }


  //Note: Metodo nao esta sendo utilizado pois estamos utilizando o metodo "onUploadCustomRxJsOperators" que faz a mesma coisa so que tem operadores customizados do Rxjs
  onUpload() {

    // this.fileBase64Service.filesToBase64(this.files)
    //   .then(resolve => {
    //     console.log(resolve)
    //   })
    //   .catch(reason => {
    //     console.log(reason)
    //   })

    if (this.files && this.files.size > 0) {
      this.uploadFileService.uploadFile(this.files, `${environment.BASE_URL}/upload`)
        .subscribe({
          next: (event: HttpEvent<Object>) => {
            if (event.type === HttpEventType.Response) {
              console.log("Upload com sucesso");
            } else if (event.type === HttpEventType.UploadProgress) {
              if (event.total) {
                const porcentagemAtual = Math.round((event.loaded * 100) / event.total);
                console.log("Porcentagem", porcentagemAtual)
                this.progressoUpload = porcentagemAtual;
              }
            }
          },
          error: err => {
            console.log("error");
            console.log(err);
          }
        })
    }
  }

  onDownloadPdf() {
    this.uploadFileService.download(`${environment.BASE_URL}/downloadPdf`).subscribe({
      next: (response: any) => {
        // fileDownloadStart(response, 'relatorio','.pdf')
        fileDownloadFromBlobAndContentTypeOnHeader(response, 'relatorio');
      }
    });
  }

  onDownloadExcel() {
    this.uploadFileService.download(`${environment.BASE_URL}/downloadExcel`).subscribe({
      next: response => {fileDownloadFromBlob(response, 'relatorio', '.xlsx')}
    });
  }
}
