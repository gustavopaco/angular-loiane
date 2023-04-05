import {Injectable} from '@angular/core';
import {HttpClient, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private requestApi: HttpClient) { }

  upload(files: Set<File>, url: string) {

    //Obs: Classe para enviar arquivos via Http
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name))

    //Note: Request utilizando HttpRequest
    // const request = new HttpRequest("POST", url, formData);
    // return this.requestApi.request(request);

    //Note: Mesmo request porem utilizando HttpClient
    return this.requestApi.post(url, formData);
  }
}
