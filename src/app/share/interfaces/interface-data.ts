import { IMarvelCharacters } from './interface-marvel';

export interface IDataMarvel {
  data: {
    results: IMarvelCharacters[],
    total: number
  };
}