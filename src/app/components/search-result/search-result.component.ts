import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { charactersSelector, dataLoadCharacters } from 'src/app/reducers/marvelCharacters';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  public characters$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);
  public searchString: string = '';
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  public result: boolean;

  constructor(
    private store: Store,
    private routerActive: ActivatedRoute) { }

  // TODO вообще по-хорошему здесь должна быть целая тонна логики
  ngOnInit(): void {
    this.search();
  }

  search() {
    this.routerActive.queryParams.subscribe((obj) => this.searchString += obj.name),
      takeUntil(this.destroy$); // !! useless mb...Later return
    if (this.searchString.length === 0) {
      this.result = true;
    } else {
      this.store.dispatch(dataLoadCharacters({ params: { name: this.searchString } }));
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
