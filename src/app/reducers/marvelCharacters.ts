import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { MarvelCharacters } from '../share/interfaces/interface-marvel';
import { CharactersState } from '../share/interfaces/interface-state';

export const CHARACTERS_KEY = 'marvel';

export const dataLoad = createAction('[MARVELCHARACTERS] dataLoad',
  props<{ requestString: string; }>());
export const dataLoadSuccess = createAction('[MARVELCHARACTERS] dataLoadSuccess',
  props<{ character: MarvelCharacters[]; collectionSize: number; }>());
export const dataLoadError = createAction('[MARVELCHARACTERS] dataLoadError',
  props<{ err: string; }>());

export const charactersInitialState: CharactersState = {
  characters: [],
  loading: false,
  error: '',
  search: '',
  collectionSize: 0,
};

export const charactersReducer = createReducer(
  charactersInitialState,
  on(dataLoad, (state, { requestString }) => ({
    ...state,
    loading: true,
    characters: [],
    search: requestString,
  })),
  on(dataLoadSuccess, (state, { character, collectionSize }) => ({
    ...state,
    loading: false,
    characters: character,
    error: '',
    collectionSize: collectionSize,
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
export const collectionSizeSelector = createSelector(
  dataCharactersSelector,
  (stateData => stateData.collectionSize
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
