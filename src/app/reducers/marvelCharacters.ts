import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { IParamsCharacters, IParamsComics } from '../share/interfaces/params.interface';
import { IMarvelCharacters } from '../share/interfaces/marvel.interface';
import { ICharactersState } from '../share/interfaces/state.interface';

export const CHARACTERS_KEY = 'marvel';

export const dataLoadCharacters = createAction('[MARVELCHARACTERS] dataLoadCharacters',
  props<{ params: IParamsCharacters }>());
export const dataLoadComics = createAction('[MARVELCHARACTERS] dataLoadComics',
  props<{ params: IParamsComics }>());
export const dataLoadSuccess = createAction('[MARVELCHARACTERS] dataLoadSuccess',
  props<{ data: IMarvelCharacters[]; collectionSize: number; }>());
export const dataLoadError = createAction('[MARVELCHARACTERS] dataLoadError',
  props<{ err: string; }>());

export const charactersInitialState: ICharactersState = {
  characters: [],
  loading: false,
  error: '',
  search: {},
  collectionSize: 0,
};

export const charactersReducer = createReducer(
  charactersInitialState,
  on(dataLoadCharacters, (state, { params }) => ({
    ...state,
    loading: true,
    characters: [],
    search: params,
  })),
  on(dataLoadComics, (state, { params }) => ({
    ...state,
    loading: true,
    characters: [],
    search: params,
  })),
  on(dataLoadSuccess, (state, { data: character, collectionSize }) => ({
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

export const dataCharactersSelector = createFeatureSelector<ICharactersState>(CHARACTERS_KEY);

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
