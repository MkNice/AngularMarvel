import { IMarvelCharacters } from './marvel.interface';

export interface IDataMarvel {
  data: {
    results: IMarvelCharacters[],
    total: number
  };
}
