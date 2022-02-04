import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, dataLoadComics } from 'src/app/reducers/marvelCharacters';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit {

  public loading$: Observable<boolean> = this.store.select(charactersLoadingSelector);
  public marvelComics$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);
  public error$: Observable<string> = this.store.select(charactersErrorSelector);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(dataLoadComics({ params: { limit: '5' } }));
  }

  public nextPage(comics) {
    this.marvelComics$ = comics;
  }
  public dataFromSort(param) {
    switch (param) {
      case 'By A-Z':
        this.store.dispatch(dataLoadComics({ params: { limit: '5', orderBy: 'title' } }));
        break;
      case 'By Z-A':
        this.store.dispatch(dataLoadComics({ params: { limit: '5', orderBy: '-title' } }));
        break;
      case 'By Modify':
        this.store.dispatch(dataLoadComics({ params: { limit: '5', orderBy: 'modified' } }));
        break;
      default:
        this.store.dispatch(dataLoadComics({ params: { limit: '5', orderBy: 'title' } }));
    }
  }
}
