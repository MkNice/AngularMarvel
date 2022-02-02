import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { Store } from '@ngrx/store';
import { charactersSelector, collectionSizeSelector, dataLoad } from 'src/app/reducers/marvelCharacters';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Input() link: string = '';
  @Output() nextPage = new EventEmitter<IMarvelCharacters[]>();

  public pagination$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);
  public collectionSize$: Observable<number> = this.store.select(collectionSizeSelector);
  public maxSizePages: number = 5;
  public itemsPerPage: number = 5;

  constructor(private store: Store) { }

  ngOnInit() { }

  public onPageChanged(pageNumber) {

    const getNumberOffset: number = (pageNumber * this.itemsPerPage) - this.itemsPerPage;
    const request: string = `${this.link}offset=${getNumberOffset}&limit=${this.itemsPerPage}`;

    this.store.dispatch(dataLoad({ requestString: request }));
  }
}
