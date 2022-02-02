import { IMarvelCharacters } from './interface-marvel';

export interface ICharactersState {
  characters: IMarvelCharacters[];
  loading: boolean;
  error: string;
  search: string;
  collectionSize: number;
}
