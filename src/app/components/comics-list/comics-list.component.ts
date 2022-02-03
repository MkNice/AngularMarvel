import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, collectionSizeSelector, dataLoadComics } from 'src/app/reducers/marvelCharacters';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit {

  public loading$: Observable<boolean> = this.store.select(charactersLoadingSelector);
  public comics$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);
  public error$: Observable<string> = this.store.select(charactersErrorSelector);
  public collectionSize$: Observable<number> = this.store.select(collectionSizeSelector);

  public numberPagesDisplay: number = 5;
  public itemsPerPage: number = 5;
  public limit: string = '5';

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(dataLoadComics({}));
  }

  pagination(currentPage: number) {
    const offset: string = `${(currentPage * this.itemsPerPage) - this.itemsPerPage}`;
    this.store.dispatch(dataLoadComics({ searchName: '', limit: this.limit, offset: offset }));
  }
}
