import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MarvelService } from '../share/services/marvel.service';
import { dataLoad, dataLoadError, dataLoadSuccess } from '../reducers/marvelCharacters';

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,
    private marvelServise: MarvelService) { }

  dataLoad$ = createEffect(() => this.actions$.pipe(
    ofType(dataLoad),
    switchMap((search) => // !! Для пагинации можно будет добавить аргумент и запихивать в него comics или же characters,
      this.marvelServise.fetchCharacters(search.heroName).pipe( // !! так же можно добавить аргументом номер страницы...
        map((data: any) => dataLoadSuccess({ data: data.data.results })), // !! Но нельзя чтобы было много параметров, ибо будет не по ООП,
        catchError((error) => of(dataLoadError({ err: error }))) // !! так что наверное нужно будет продумать еффекты :)
      )
    )
  ));
}
