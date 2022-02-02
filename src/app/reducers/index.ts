import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ICharactersState } from '../share/interfaces/interface-state';
import { charactersReducer, CHARACTERS_KEY } from './marvelCharacters';

export interface State {
  [CHARACTERS_KEY]: ICharactersState;
}

export const reducers: ActionReducerMap<State> = {
  [CHARACTERS_KEY]: charactersReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];