import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnDestroy {

  public page: number;
  public collectionSize: number;
  private itemsPerPage: number = 5;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  @Input() link: string = '';
  @Output() nextHeroes = new EventEmitter<MarvelCharacters[]>();
  @Output() nextComics = new EventEmitter<MarvelCharacters[]>();


  constructor(public marvelService: MarvelService, private apiService: APIService) {
    marvelService.fetchMarvelPagination(this.page, this.itemsPerPage)
      .subscribe(() => {
        this.collectionSize = marvelService.collectionSize * 2;
      });
  }

  ngOnInit() { }

  onPageChanged(pageNumber) {

    const requestString: string = `${this.link}offset=${(pageNumber * this.itemsPerPage) - 5}&limit=${this.itemsPerPage}`;

    this.apiService.getData(requestString)
      .pipe(
        tap((nextData: DataMarvel) => {
          this.nextHeroes.emit(nextData.data.results);
          this.nextComics.emit(nextData.data.results);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  onPageChangedForComics(pageNumber) {

    const requestString: string = `comics?offset=${(pageNumber * this.itemsPerPage) - 5}&limit=${this.itemsPerPage}`;

    this.apiService.getData(requestString)
      .pipe(
        tap((nextData: DataMarvel) => {
          this.nextComics.emit(nextData.data.results);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
