import { IParamsCharacters } from './interace-params';
import { IMarvelCharacters } from './interface-marvel';

export interface ICharactersState {
  characters: IMarvelCharacters[];
  loading: boolean;
  error: string;
  search: IParamsCharacters;
  collectionSize: number;
}
