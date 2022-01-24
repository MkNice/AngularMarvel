import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnDestroy {

  @Input() link: string = '';
  @Output() nextPage = new EventEmitter<MarvelCharacters[]>();

  public page: number;
  public collectionSize: number;
  public itemsPerPage: number = 5;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    private marvelService: MarvelService,
    private apiService: APIService,
    private store: Store) {
    marvelService.fetchMarvelPagination(this.page, this.itemsPerPage) // ??? Мб нужно добавить отписку destroy$, а вообще тут надо нахер передалть это дело...
      .subscribe(() => {
        this.collectionSize = marvelService.collectionSize * 2;
      });
  }

  ngOnInit() { }

  onPageChanged(pageNumber) {

    const getNumberOffset: number = (pageNumber * this.itemsPerPage) - this.itemsPerPage;
    const requestString: string = `${this.link}offset=${getNumberOffset}&limit=${this.itemsPerPage}`;

    this.apiService.getData(requestString)
      .pipe(
        tap((nextData: DataMarvel) => {
          this.nextPage.emit(nextData.data.results);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
