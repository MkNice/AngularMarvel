import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { marvelCharacters } from '../interfaces/interface-marvel';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarvelService {
  public heroes: marvelCharacters[] = [];
  constructor(public http: HttpClient) { }

  fetchMarvel(): Observable<marvelCharacters[]> {
    return this.http.get<marvelCharacters[]>(`${environment['LINK_MARVEL']}`)
      .pipe(
        tap(heroes => this.heroes = heroes)
      );
  }
}