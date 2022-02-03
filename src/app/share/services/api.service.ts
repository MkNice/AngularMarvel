import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDataMarvel } from '../interfaces/interface-data';

@Injectable()

export class APIService {

  constructor(private http: HttpClient) {}
  
  public exper(params): Observable<IDataMarvel> { // params === {name='3-d Man'}

    return this.http.get<IDataMarvel>(
      `${environment.LINK_MARVEL}/characters`, {
      params: {
        ...params,
        ts: '1',
        hash: environment.HASH,
        apikey: environment.PUBLIC_KEY
      }
    }
    );
  }
  public getData(params: string): Observable<IDataMarvel> {
    return this.http.get<IDataMarvel>(
      `${environment.LINK_MARVEL}/${params}&ts=1&hash=${environment.HASH}&apikey=${environment.PUBLIC_KEY}`
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
