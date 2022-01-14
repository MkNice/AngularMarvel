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
  public collectionSize: number;
  public giveMeText: any;

  constructor(public http: HttpClient) { }

  fetchCharacters(name: string = ''): Observable<DataMarvel> {
    let data: string = '';
    if (name) { data = '&name=${name}'; }
    return this.http.get<DataMarvel>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}` + data);
    }

  fetchMarvelPagination(page: number, itemsPerPage: number): Observable<MarvelCharacters[]> {
    const heroes = this.http.get<DataMarvel>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`)
      .pipe(
        tap((heroes: DataMarvel) => {
          this.marvelHeroes = heroes.data.results;
          this.collectionSize = heroes.data.total;
        })
      );

    return this.getPageItems(heroes, page, itemsPerPage);
  }

  getPageItems(users: any, page: number, itemsPerPage: number): any {
    return users;
  }

}
