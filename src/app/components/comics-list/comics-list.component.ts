import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, dataLoad } from 'src/app/reducers/marvelCharacters';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit, OnDestroy {

  //Store
  public loading$ = this.store.select(charactersLoadingSelector);
  public marvelComics$ = this.store.select(charactersSelector);
  public error$ = this.store.select(charactersErrorSelector);

  //Old files
  public marvelComics: MarvelCharacters[] = [];
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  public linkComics: string = 'comics?limit=5&';

  constructor(
    private apiService: APIService,
    private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(dataLoad({ requestString: this.linkComics }));
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  nextPage(comics) {
    this.marvelComics$ = comics;
  }
}
