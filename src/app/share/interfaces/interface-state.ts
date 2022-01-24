import { MarvelCharacters } from './interface-marvel';

export interface CharactersState {
  characters: MarvelCharacters[];
  loading: boolean;
  error: string;
  search: string;
  paginationString: string;
}