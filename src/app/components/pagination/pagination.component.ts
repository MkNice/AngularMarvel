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

  

  public collectionSize: number = 1559;
  public numberPagesDisplay: number = 5; // Так и должно быть я думаю
  public itemsPerPage: number = 5; // и это тоже
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(private marvelService: MarvelService, private apiService: APIService) { }

  ngOnInit() { }

  onPageChanged(pageNumber) {
 // click to pageNumber 2
 // Братан heroes-list, на меня тыкнули и у меня страница 2, что делать?
 // Без паники, передай мне эту цифру, я сделаю запрос и отрисую
    const offset: string = `${(pageNumber * this.itemsPerPage) - 5}`;

    this.apiService.getDataCharacters('', '5', offset)
      .pipe(
        tap((nextData: IDataMarvel) => {
          this.nextPage.emit(nextData.data.results);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    // this.apiService.getDataComics('', '5', offset)
    //   .pipe(
    //     tap((nextData: IDataMarvel) => {
    //       this.nextPage.emit(nextData.data.results);
    //     }),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe();
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
