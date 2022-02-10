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
  public marvelComics$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);
  public error$: Observable<string> = this.store.select(charactersErrorSelector);
  public collectionSize$: Observable<number> = this.store.select(collectionSizeSelector);
  public maxSizePages: number = 5;
  public itemsPerPage: number = 5;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(dataLoadComics({ params: { limit: '5' } }));
  }
  public pagination(curentPage: number) {
    const offset = `${(this.itemsPerPage * curentPage) - this.itemsPerPage}`;
    this.store.dispatch(dataLoadComics({ params: { limit: '5', offset: offset } }));
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
