import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { dataLoad, dataLoadError, dataLoadSuccess } from '../reducers/marvelCharacters';
import { DataMarvel } from '../share/interfaces/interface-data';
import { APIService } from '../share/services/api.service';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private apiService: APIService) { }

  dataLoad$ = createEffect(() => this.actions$.pipe(
    ofType(dataLoad),
    switchMap((pagination) =>
      this.apiService.getData(pagination.requestString).pipe(
        map((data: DataMarvel) => dataLoadSuccess({ data: data.data.results })),
        catchError((error) => of(dataLoadError({ err: error })))
      )
    )
  ));
}
