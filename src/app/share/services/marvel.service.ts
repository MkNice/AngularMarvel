import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarvelCharacters } from '../interfaces/interface-marvel';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataMarvel } from '../interfaces/interface-data';

@Injectable()
export class MarvelService {

  public collectionSize: number; // ! Сделал криво, переделывай. И вообще хранить состояния в сервисе?? По жопе тебе надо надавать

  constructor(private http: HttpClient) { }

  fetchMarvelPagination(page: number, itemsPerPage: number): Observable<MarvelCharacters[]> {
    const heroes = this.http.get<DataMarvel>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`)
      .pipe(
        tap((heroes: DataMarvel) => {
          this.collectionSize = heroes.data.total;
        })
      );

    return this.getPageItems(heroes, page, itemsPerPage);
  }

  getPageItems(users: any, page: number, itemsPerPage: number): any {
    return users;
  }
}
