import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { marvelCharacters } from '../interfaces/interface-marvel';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarvelService {

  public loading: boolean = true;
  public marvelHeroes: marvelCharacters[] = [];

  constructor(public http: HttpClient) { }

  fetchMarvel(): Observable<marvelCharacters[]> {
    return this.http.get<marvelCharacters[]>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`)
      .pipe(
        tap((heroes: any) => this.marvelHeroes = heroes.data.results) // results: marvelCharacters[], а вот что за тип данных у data, я не знаю :(
      );
  }

  fetchMarvelPagination(page: number, itemsPerPage: number): Observable<marvelCharacters[]> {
   let heroes = this.http.get<marvelCharacters[]>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`)
      .pipe(
        tap((heroes: any) => this.marvelHeroes = heroes.data.results) // results: marvelCharacters[], а вот что за тип данных у data, я не знаю :(
      );
    return this.getPageItems(heroes, page, itemsPerPage);
  }

  getPageItems(users: any, page: number, itemsPerPage: number): any {
    return users;
  }

}
