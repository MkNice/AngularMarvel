import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMarvelCharacters } from '../interfaces/interface-marvel';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDataMarvel } from '../interfaces/interface-data';

@Injectable()
export class MarvelService {

  public loading: boolean = true;
  public marvelHeroes: IMarvelCharacters[] = [];
  public collectionSize: number;

  constructor(private http: HttpClient) { }

  fetchCharacters(name: string = ''): Observable<IDataMarvel> {
    let data: string = '';
    if (name) { data = `&name=${name}`; }
    return this.http.get<IDataMarvel>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}&limit=5` + data);
    }

  fetchMarvelPagination(page: number, itemsPerPage: number): Observable<IMarvelCharacters[]> {
    const heroes = this.http.get<IDataMarvel>(`${environment['LINK_MARVEL']}/characters?ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`)
      .pipe(
        tap((heroes: IDataMarvel) => {
          this.collectionSize = heroes.data.total;
        })
      );

    return this.getPageItems(heroes, page, itemsPerPage);
  }

  getPageItems(users: any, page: number, itemsPerPage: number): any {
    return users;
  }
}
