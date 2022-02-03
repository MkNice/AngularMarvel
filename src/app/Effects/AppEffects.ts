import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { dataLoadCharacters, dataLoadError, dataLoadSuccess } from '../reducers/marvelCharacters';
import { IDataMarvel } from '../share/interfaces/interface-data';
import { APIService } from '../share/services/api.service';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private apiService: APIService) { }

    public dataLoad$ = createEffect(() => this.actions$.pipe(
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
}