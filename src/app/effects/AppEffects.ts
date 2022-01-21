import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MarvelService } from '../share/services/marvel.service';
import { dataLoad, dataLoadError, dataLoadSuccess } from '../reducers/marvelCharacters';

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private marvelServise:MarvelService) { }

  dataLoad$ = createEffect(() => this.actions$.pipe(
    ofType(dataLoad),
    switchMap((search) =>
      this.marvelServise.fetchCharacters(search.heroName).pipe(
        map((data: any) => dataLoadSuccess({ data: data.data.results })),
        catchError((error) => of(dataLoadError({ err: error })))
      )
    )
  ));
}
