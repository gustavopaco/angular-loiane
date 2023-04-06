import {filter, map, pipe, tap} from "rxjs";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";

export const fileUploadFiltrarUploadCompleto = <T>() => {
  return pipe(
    filter((event: any) => event.type === HttpEventType.Response),
    map((response: HttpResponse<T>) => response.body)
  )
}

export const fileUploadProgressoAtual = <T>(callback: (porcentagemAtual: number) => void) => {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress && event.total) {
      callback(Math.round((event.loaded * 100) / event.total));
    }
  })
}
