import {Component, OnInit} from '@angular/core';
import {UploadFileService} from "../shared/service/upload-file.service";
import {FileBase64Service} from "../shared/service/file-base64.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styles: []
})
export class UploadFileComponent implements OnInit {

  files: Set<File> = new Set<File>();

  constructor(private uploadFileService: UploadFileService,
              private fileBase64Service: FileBase64Service) {
  }

  onChange(event: Event) {
    // console.log(((<HTMLInputElement>event.target).files as FileList).item(0))
    let fileList = ((<HTMLInputElement>event.target).files as FileList)

    if (!this.fileBase64Service.isDuplicatedFile(this.files, fileList[0])) {
      for (let i = 0; i < fileList.length; i++) {
        this.files?.add(fileList[i]);
        console.log(this.files)
      }
    }
  }

  onUpload() {

    // this.fileBase64Service.filesToBase64(this.files)
    //   .then(resolve => {
    //     console.log(resolve)
    //   })
    //   .catch(reason => {
    //     console.log(reason)
    //   })

    if (this.files && this.files.size > 0) {
      this.uploadFileService.upload(this.files, `${environment.BASE_URL}/upload`)
        .subscribe({
          next: response => {
            console.log("Upload com sucesso");
            console.log(response);
          },
          error: err => {
            console.log("error");
            console.log(err);
          }
        })
    }
  }

  ngOnInit()
    :
    void {
  }
}
