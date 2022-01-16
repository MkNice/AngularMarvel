import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class APIService {

  constructor(public http: HttpClient) {}

  public getData(params: string): Observable<unknown> {
    return this.http.get(
      `${environment.LINK_MARVEL}/${params}&ts=1&hash=${environment.HASH}&apikey=${environment.PUBLIC_KEY}`// + data
    );
  }

    // public postData(): Observable<unknown> {
    //     return this.http.post(
    //         `${environment.LINK_MARVEL}/${params}`// + data
    //       );
    // }

    // public putData(): Observable<unknown> {
    //     return this.http.put(
    //         `${environment.LINK_MARVEL}/${params}`// + data
    //       );
    // }

    // public deleteData(): Observable<unknown> {
    //     return this.http.delete(
    //         `${environment.LINK_MARVEL}/${params}`// + data
    //       );
    // }
}
