import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private requestApi: HttpClient) { }

  uploadFile(files: Set<File>, url: string) {

    //Obs: Classe para enviar arquivos via Http
    const formData = new FormData();

    files.forEach(file => formData.append('file', file, file.name));

    //Note: Request utilizando HttpRequest
    // const request = new HttpRequest("POST", url, formData);
    // return this.requestApi.request(request);

    //Note: Mesmo request porem utilizando HttpClient
    return this.requestApi.post(url, formData, {observe: 'events', reportProgress: true});
  }

  // Note: Se for utilizar o reportProgress vamos precisar que o Backend coloque no header o "content-length"
  //  para que o angular consiga saber o tamanho do arquivo e e ai o reportPorgress funcione
  download(url: string) {
    return this.requestApi.get(url, {responseType: 'blob' as 'json', reportProgress:true})
  }
}
