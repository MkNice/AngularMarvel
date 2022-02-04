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
  public selectedHero: IMarvelCharacters;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    private store: Store,
    private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerActive.queryParams.subscribe((obj) => this.searchString += obj.name),
      takeUntil(this.destroy$); // !! useless mb...Later return
    this.store.dispatch(dataLoadCharacters({ params: {name: this.searchString} }));
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
  backPage(){
    window.history.back() // TODO в зазметке кнопку добавь
  }
}
