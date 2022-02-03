import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { SortDataService } from './sort-data.service';
import { Store } from '@ngrx/store';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, collectionSizeSelector, dataLoadCharacters } from 'src/app/reducers/marvelCharacters';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {

  public loading$: Observable<boolean> = this.store.select(charactersLoadingSelector);
  public characters$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);
  public error$: Observable<string> = this.store.select(charactersErrorSelector);
  public collectionSize$: Observable<number> = this.store.select(collectionSizeSelector);

  public numberPagesDisplay: number = 5;
  public itemsPerPage: number = 5;
  public limit: string = '5';

  constructor(
    private sortService: SortDataService,
    private store: Store) { }

  ngOnInit() {
    this.store.dispatch(dataLoadCharacters({}));
  }

  pagination(currentPage: number) {
    const offset: string = `${(currentPage * this.itemsPerPage) - this.itemsPerPage}`;
    this.store.dispatch(dataLoadCharacters({ searchName: '', limit: this.limit, offset: offset }));

  }

  dataFromSortLocal(param) {
    switch (param) {
      case 'By A-Z':
        this.characters$ = this.sortService.sortByAlphabetic(this.characters$);
        break;
      case 'By Z-A':
        this.characters$ = this.sortService.sortByReverseAlphabetic(this.characters$);

        break;
      case 'By Modify':
        this.characters$ = this.sortService.sortByDate(this.characters$);
        break;
      default:
        this.characters$ = this.sortService.sortByAlphabetic(this.characters$);
    }
  }
  dataFromSortGlobal(param) {
    switch (param) {
      case 'By A-Z':
        this.store.dispatch(dataLoadCharacters({ searchName: '', limit: this.limit, offset: '', sortBy: 'name' }));
        break;
      case 'By Z-A':
        this.store.dispatch(dataLoadCharacters({ searchName: '', limit: this.limit, offset: '', sortBy: '-name' }));
        break;
      case 'By Modify':
        this.store.dispatch(dataLoadCharacters({ searchName: '', limit: this.limit, offset: '', sortBy: 'modified' }));
        break;
      default:
        this.store.dispatch(dataLoadCharacters({ searchName: '', limit: this.limit, offset: '', sortBy: 'name' }));
    }
  }
}
