import { IParamsCharacters } from './params.interface';
import { IMarvelCharacters } from './marvel.interface';

export interface ICharactersState {
  characters: IMarvelCharacters[];
  loading: boolean;
  error: string;
  search: IParamsCharacters;
  collectionSize: number;
}
