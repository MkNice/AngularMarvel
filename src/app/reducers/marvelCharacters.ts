import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { MarvelCharacters } from '../share/interfaces/interface-marvel';
import { CharactersState } from '../share/interfaces/interface-state';

export const CHARACTERS_KEY = 'marvel';

export const dataLoad = createAction('[MARVELCHARACTERS] dataLoad',
  props<{ requestString: any; }>());
export const dataLoadSuccess = createAction('[MARVELCHARACTERS] dataLoadSuccess',
  props<{ data: MarvelCharacters[]; }>());
export const dataLoadError = createAction('[MARVELCHARACTERS] dataLoadError',
  props<{ err: string; }>());

export const charactersInitialState: CharactersState = {
  characters: [],
  loading: false,
  error: '',
  search: '',
};

export const charactersReducer = createReducer(
  charactersInitialState,
  on(dataLoad, (state, { requestString }) => ({
    ...state,
    loading: true,
    characters: [],
    search: requestString,
  })),
  on(dataLoadSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    characters: data,
    error: '',
  })),
  on(dataLoadError, (state, { err }) => ({
    ...state,
    loading: false,
    characters: [],
    error: err
  }))
);

export const dataCharactersSelector = createFeatureSelector<CharactersState>(CHARACTERS_KEY);

export const charactersSelector = createSelector(
  dataCharactersSelector,
  (stateData => stateData.characters
  ),
);
export const charactersErrorSelector = createSelector(
  dataCharactersSelector,
  (stateData => stateData.error
  ),
);
export const charactersLoadingSelector = createSelector(
  dataCharactersSelector,
  (stateData => stateData.loading
  ),
);