import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MarvelCharacters } from '../interfaces/interface-marvel';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataMarvel } from '../interfaces/interface-data';

@Injectable()
export class MarvelService {

  public loading: boolean = true;
  public marvelHeroes: MarvelCharacters[] = [];

  constructor(public http: HttpClient) { }

  fetchMarvel(): Observable<DataMarvel> {
    return this.http.get<DataMarvel>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`);
  }

  fetchMarvelPagination(page: number, itemsPerPage: number): Observable<MarvelCharacters[]> {
    let heroes = this.http.get<DataMarvel>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`)
      .pipe(
        tap((heroes: DataMarvel) => {
          this.marvelHeroes = heroes.data.results;
          console.log(heroes)
        })
        // results: marvelCharacters[], а вот что за тип данных у data, я не знаю :(
      );

    return this.getPageItems(heroes, page, itemsPerPage);
  }

  getPageItems(users: any, page: number, itemsPerPage: number): any {
    return users;
  }

}
