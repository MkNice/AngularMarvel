import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { dataLoad } from 'src/app/reducers/marvelCharacters';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnDestroy {

  @Input() link: string = '';
  @Output() nextPage = new EventEmitter<MarvelCharacters[]>();

  public pagination$ = this.store.select(dataLoad);

  public page: number;
  public collectionSize = 3118; // !! ХардКод, нужно фиксить :)
  public itemsPerPage: number = 5;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    private store: Store) { }

  ngOnInit() { }

  onPageChanged(pageNumber) {

    const getNumberOffset: number = (pageNumber * this.itemsPerPage) - this.itemsPerPage;
    const request: string = `${this.link}offset=${getNumberOffset}&limit=${this.itemsPerPage}`;

    this.store.dispatch(dataLoad({ requestString: request }));
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
