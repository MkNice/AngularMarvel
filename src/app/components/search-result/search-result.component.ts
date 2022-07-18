import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { charactersSelector, dataLoadCharacters } from 'src/app/reducers/marvelCharacters';
import { IMarvelCharacters } from 'src/app/share/interfaces/marvel.interface';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  public characters$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  public searchString: string = '';
  public result: boolean;

  constructor(
    private store: Store,
    private routerActive: ActivatedRoute) { }

  // TODO можно тут сделать тонну логики по проверкам, тип если при запросе title: searchString приходит пустой массив, то спускаемся ниже и пробуем
  // TODO через nameStartsWith, ну и элементарная проверка на пустоту строки не нужна будет, лишь бы научится проверять обсёрвбл массив
  ngOnInit(): void {
    this.search();
  }

  search() {
    this.routerActive.queryParams.subscribe((obj) => this.searchString += obj.name),
      takeUntil(this.destroy$); // !! useless mb...Later return
    if (this.searchString.length === 0) {
      this.result = true;
      this.characters$ = null;
    } else {
      this.store.dispatch(dataLoadCharacters({ params: { nameStartsWith: this.searchString } }));
      this.result = false;
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
  backPage() {
    window.history.back();
  }
}
