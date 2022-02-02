import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDataMarvel } from '../interfaces/interface-data';

@Injectable()

export class APIService {

  constructor(private http: HttpClient) {
    enum paramsEnum { searchName, limit, offset, sortBy, sortOrder }
  }

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
  public filteredParams = obj => {
    Object.keys(obj).forEach(key => obj[key] == false && delete obj[key]);
  };
  public getDataCharacters(
    searchName: string = '',
    limit: string = '',
    offset: string = '',
    sortBy: string = '',
    sortOrder: string = ''): Observable<IDataMarvel> {
    const params = {
      name: searchName,
      limit: limit,
      offset: offset,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    this.filteredParams(params);
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
  public getDataComics(searchName: string = '',
    limit: string = '',
    offset: string = '',
    sortBy: string = '',
    sortOrder: string = ''): Observable<IDataMarvel> {
    const params = {
      name: searchName,
      limit: limit,
      offset: offset,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    this.filteredParams(params);
    return this.http.get<IDataMarvel>(
      `${environment.LINK_MARVEL}/comics`, {
      params: {
        ...params,
        ts: '1',
        hash: environment.HASH,
        apikey: environment.PUBLIC_KEY
      }
    }
    );
  }
  /*
  export const dataLoad = createAction('[MARVELCHARACTERS] dataLoad',
    props<{ requestString: string; model?: string }>());  // model, searchName, limit, offset, sortBy, sortOrder
  */

  /*public getData(params: string): Observable<unknown> {
    return this.http.get(
      `${environment.LINK_MARVEL}/${params}&ts=1&hash=${environment.HASH}&apikey=${environment.PUBLIC_KEY}`
    );
  }*/
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
