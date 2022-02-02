import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { IDataMarvel } from 'src/app/share/interfaces/interface-data';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnDestroy {

  @Input() link: string = '';
  @Output() nextPage = new EventEmitter<IMarvelCharacters[]>();

  public page: number;
  public collectionSize: number;
  private itemsPerPage: number = 5;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(private marvelService: MarvelService, private apiService: APIService) {
    marvelService.fetchMarvelPagination(this.page, this.itemsPerPage)
      .subscribe(() => {
        this.collectionSize = marvelService.collectionSize * 2;
      });
  }

  ngOnInit() { }

  onPageChanged(pageNumber) {

    const requestString: string = `${this.link}offset=${(pageNumber * this.itemsPerPage) - 5}&limit=${this.itemsPerPage}`;

    this.apiService.getDataCharacters(requestString)
      .pipe(
        tap((nextData: IDataMarvel) => {
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
