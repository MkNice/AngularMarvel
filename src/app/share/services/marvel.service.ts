import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { marvelCharacters } from '../interfaces/interface-marvel';
import { HttpClient } from '@angular/common/http';
import { delay, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class MarvelService {
  public PUBLIC_KEY: string = '7288dd042f6ab7b5972df81296c85109';
  public PRIVATE_KEY: string = '955c8e9ade6624038ac81f64083c0be3161782c6';
  public HASH: string = '595293072ed6acf04ae2708233f23cf9';
  public heroes: marvelCharacters[] = [];
  public loading: boolean = true;

  constructor(public http: HttpClient) { }

  getAllCharacters(): Observable<marvelCharacters> {
    return this.http.get<marvelCharacters>((`${environment['LINK_MARVEL']}/comics?apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`))
    .pipe(map((data: any) => data));
  }

  fetchMarvelsssssss(): Observable<marvelCharacters[]> {
    return this.http.get<marvelCharacters[]>(`${environment['LINK_MARVEL']}`)
      .pipe(
        tap(heroes => this.heroes = heroes)
      );
  }
  fetchMarvel() {
    this.http.get(`${environment['LINK_MARVEL']}`)
      .pipe(delay(1000));
  }
}

/* @Injectable()
export class MarvelService {
  public PUBLIC_KEY: string = '7288dd042f6ab7b5972df81296c85109';
  public PRIVATE_KEY: string = '955c8e9ade6624038ac81f64083c0be3161782c6';
  public HASH: string = '';
  public heroes: marvelCharacters[] = [];
  public loading: boolean = true;

  constructor(public http: HttpClient) { }

  getAllCharacters(): Observable<any> {
    return this.http.get<any>((`${environment['LINK_MARVEL']}/characters?ts=1&=apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`))
    .pipe(map((data: any) => data));
  }
  fetchMarvelsssssss(): Observable<marvelCharacters[]> {
    return this.http.get<marvelCharacters[]>(`${environment['LINK_MARVEL']}`)
      .pipe(
        tap(heroes => this.heroes = heroes)
      );
  }
  fetchMarvel() {
    this.http.get(`${environment['LINK_MARVEL']}`)
      .pipe(delay(1000));
  }
} */