import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IDataMarvel } from 'src/app/share/interfaces/interface-data';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public marvelComics: IMarvelCharacters[] = [];
  public collectionSize: number ;
  public numberPagesDisplay: number = 5;
  public itemsPerPage: number = 5;
  public limit: string = '5';
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(private apiService: APIService) { }

  ngOnInit(): void {

    this.apiService.getDataComics().pipe(
      tap((data: IDataMarvel) => {
        this.marvelComics = data.data.results;
        this.collectionSize = data.data.total
      }),
      takeUntil(this.destroy$)
    )
      .subscribe(() => {
        this.loading = false;
      });
  }

  pagination(currentPage: number) {
    const offset: string = `${(currentPage * this.itemsPerPage) - this.itemsPerPage}`;

    this.apiService.getDataComics('', this.limit, offset, '')
      .pipe(
        tap((nextData: IDataMarvel) => {
          this.marvelComics = nextData.data.results;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
