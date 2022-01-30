import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, dataLoad } from 'src/app/reducers/marvelCharacters';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit {

  public loading$ = this.store.select(charactersLoadingSelector);
  public marvelComics$ = this.store.select(charactersSelector);
  public error$ = this.store.select(charactersErrorSelector);

  public linkComics: string = 'comics?limit=5&';
  public searchComics: string = 'comics?title=';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(dataLoad({ requestString: this.linkComics }));
  }

  public nextPage(comics) {
    this.marvelComics$ = comics;
  }
  public dataFromSort(param) {
    const sortByAlphabetic: string = `${this.linkComics}orderBy=title&`;
    const sortByReverseAlphabetic: string = `${this.linkComics}orderBy=-title&`;
    const sortByModified: string = `${this.linkComics}orderBy=modified&`;

    switch (param) {
      case 'By A-Z':
        this.store.dispatch(dataLoad({ requestString: sortByAlphabetic }));
        break;
      case 'By Z-A':
        this.store.dispatch(dataLoad({ requestString: sortByReverseAlphabetic }));
        break;
      case 'By Modify':
        this.store.dispatch(dataLoad({ requestString: sortByModified }));
        break;
      default:
        this.store.dispatch(dataLoad({ requestString: this.linkComics }));
    }
  }
}
