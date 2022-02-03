import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Injectable({
  providedIn: 'root'
})
export class SortDataService {

  constructor() { }
  
    public sortByAlphabetic(data: Observable<IMarvelCharacters[]>): Observable<IMarvelCharacters[]> {
      return data.pipe(
        tap((arr) => arr.sort((a: IMarvelCharacters, b: IMarvelCharacters) => a.name < b.name ? -1 : 1))
      );
    }
    public sortByReverseAlphabetic(data: Observable<IMarvelCharacters[]>): Observable<IMarvelCharacters[]> {
      return data.pipe(
        tap((arr) => arr.sort((b: IMarvelCharacters, a: IMarvelCharacters) => a.name < b.name ? -1 : 1))
      );
    }
    public sortByDate(data: Observable<IMarvelCharacters[]>): Observable<IMarvelCharacters[]> {
      return data.pipe(
        tap((arr) => arr.sort((a: IMarvelCharacters, b: IMarvelCharacters) => a.modified < b.modified ? -1 : 1))
      );
    }
  }