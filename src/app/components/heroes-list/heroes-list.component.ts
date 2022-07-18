import { Component, OnInit } from '@angular/core';
import { IMarvelCharacters } from 'src/app/share/interfaces/marvel.interface';
import { Store } from '@ngrx/store';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, collectionSizeSelector, dataLoadCharacters } from 'src/app/reducers/marvelCharacters';
import { Observable } from 'rxjs';

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
  public maxSizePages: number = 5;
  public itemsPerPage: number = 5;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(dataLoadCharacters({ params: { limit: '5' } }));
  }

  public pagination(curentPage: number) {
    const offset = `${(this.itemsPerPage * curentPage) - this.itemsPerPage}`;
    this.store.dispatch(dataLoadCharacters({ params: { limit: '5', offset: offset } }));
  }
  public dataFromSort(param) {
    switch (param) {
      case 'By A-Z':
        this.store.dispatch(dataLoadCharacters({ params: { limit: '5', orderBy: 'name' } }));
        break;
      case 'By Z-A':
        this.store.dispatch(dataLoadCharacters({ params: { limit: '5', orderBy: '-name' } }));
        break;
      case 'By Modify':
        this.store.dispatch(dataLoadCharacters({ params: { limit: '5', orderBy: 'modified' } }));
        break;
      default:
        this.store.dispatch(dataLoadCharacters({ params: { limit: '5', orderBy: 'name' } }));
    }
  }
}