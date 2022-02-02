import { Injectable } from '@angular/core';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Injectable({
  providedIn: 'root'
})
export class SortDataService {

  constructor() { }

  public sortByAlphabetic(data: IMarvelCharacters[]): IMarvelCharacters[] {
    return data.sort((a: IMarvelCharacters, b: IMarvelCharacters) => a.name < b.name ? -1 : 1);
  }

  public sortByReverseAlphabetic(data: IMarvelCharacters[]): IMarvelCharacters[] {
    return data.sort((b: IMarvelCharacters, a: IMarvelCharacters) => a.name < b.name ? -1 : 1);
  }

  public sortByDate(data: IMarvelCharacters[]): IMarvelCharacters[] {
    return data.sort((a: IMarvelCharacters, b: IMarvelCharacters) => a.modified < b.modified ? -1 : 1);
  }
}
