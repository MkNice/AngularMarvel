import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';
import { takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

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
  @Output() nextHeroes = new EventEmitter<any>();

  constructor(public marvelService: MarvelService, private apiService: APIService) {
    marvelService.fetchMarvelPagination(this.page, this.itemsPerPage)
      .subscribe(() => {
        this.collectionSize = marvelService.collectionSize;
      });
  }

  ngOnInit() { }

  onPageChanged(pageNumber) {
    const requestString: string = `characters?offset=${(pageNumber * this.itemsPerPage) - 5}&limit=${this.itemsPerPage}`;

    this.apiService.getData(requestString)
      .pipe(
        tap((nextData: any) => {
          this.nextHeroes.emit(nextData.data.results);
          console.log('new list of heroes ', nextData.data);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
    console.log("page changed:" + pageNumber);
  }

  ngOnDestroy() { }
}
