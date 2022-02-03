import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { dataLoadCharacters, dataLoadComics, dataLoadError, dataLoadSuccess } from '../reducers/marvelCharacters';
import { IDataMarvel } from '../share/interfaces/interface-data';
import { APIService } from '../share/services/api.service';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private apiService: APIService) { }

  public dataLoadCharacters$ = createEffect(() => this.actions$.pipe(
    ofType(dataLoadCharacters),
    switchMap((dataString) =>
      this.apiService.getDataCharacters(
        dataString.searchName,
        dataString.limit,
        dataString.offset,
        dataString.sortBy)
        .pipe(
          map((data: IDataMarvel) => dataLoadSuccess({ character: data.data.results, collectionSize: data.data.total })),
          catchError((error) => of(dataLoadError({ err: error })))
        )
    )
  ));
  public dataLoadComics$ = createEffect(() => this.actions$.pipe(
    ofType(dataLoadComics),
    switchMap((dataString) =>
      this.apiService.getDataComics(
        dataString.searchName,
        dataString.limit,
        dataString.offset,
        dataString.sortBy)
        .pipe(
          map((data: IDataMarvel) => dataLoadSuccess({ character: data.data.results, collectionSize: data.data.total })),
          catchError((error) => of(dataLoadError({ err: error })))
        )
    )
  ));
}