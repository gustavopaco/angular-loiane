import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  constructor(protected requestApi: HttpClient, @Inject('API_URL') private API_URL: string) { }

  getRecords(): Observable<T[]> {
    return this.requestApi.get<T[]>(this.API_URL);
  }

  loadById(id: number): Observable<T> {
    return this.requestApi.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  saveRecord(record: any): Observable<void> {
    if (record.id) {
      return this.updateRecord(record);
    } else {
      return this.addRecord(record);
    }
  }

  removeRecord(id: number): Observable<void> {
    return this.requestApi.delete<void>(`${this.API_URL}/${id}`).pipe(take(1))
  }

  private addRecord(record: any): Observable<void> {
    return this.requestApi.post<void>(this.API_URL, record).pipe(take(1));
  }

  private updateRecord(record: any): Observable<void> {
    return this.requestApi.put<void>(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }
}
