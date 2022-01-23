import { Injectable } from '@angular/core';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Injectable({
  providedIn: 'root'
})
export class SortDataService {

  constructor() { }

  public sortByAlphabetic(data: MarvelCharacters[]): MarvelCharacters[] {
    return data.sort((a: MarvelCharacters, b: MarvelCharacters) => a.name < b.name ? -1 : 1);
  }

  public sortByReverseAlphabetic(data: MarvelCharacters[]): MarvelCharacters[] {
    return data.sort((b: MarvelCharacters, a: MarvelCharacters) => a.name < b.name ? -1 : 1);
  }

  public sortByDate(data: MarvelCharacters[]): MarvelCharacters[] {
    return data.sort((a: MarvelCharacters, b: MarvelCharacters) => a.modified < b.modified ? -1 : 1);
  }
}
