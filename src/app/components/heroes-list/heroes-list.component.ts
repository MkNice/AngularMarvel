import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { IDataMarvel } from 'src/app/share/interfaces/interface-data';
import { APIService } from 'src/app/share/services/api.service';
import { SortDataService } from './sort-data.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit, OnDestroy {

  public marvelHeroes: IMarvelCharacters[] = [];
  public loading: boolean = true;
  public selectedHero: IMarvelCharacters;
  public collectionSize: number;
  public numberPagesDisplay: number = 5;
  public itemsPerPage: number = 5;
  public limit: string = '5';
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    private apiService: APIService,
    private sortService: SortDataService) { }

  ngOnInit() {
    this.apiService.getDataCharacters()
      .pipe(
        tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loading = false;
      });
  }

  pagination(currentPage: number) {
    const offset: string = `${(currentPage * this.itemsPerPage) - this.itemsPerPage}`;

    this.apiService.getDataCharacters('', this.limit, offset, '')
      .pipe(
        tap((nextData: IDataMarvel) => {
          this.marvelHeroes = nextData.data.results;
          this.collectionSize = nextData.data.total
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loading = false;
      });
  }

  dataFromSortLocal(param) {
    switch (param) {
      case 'By A-Z':
        this.marvelHeroes = this.sortService.sortByAlphabetic(this.marvelHeroes);
        break;
      case 'By Z-A':
        this.marvelHeroes = this.sortService.sortByReverseAlphabetic(this.marvelHeroes);

        break;
      case 'By Modify':
        this.marvelHeroes = this.sortService.sortByDate(this.marvelHeroes);
        break;
      default:
        this.marvelHeroes = this.sortService.sortByAlphabetic(this.marvelHeroes);
    }
  }
  dataFromSortGlobal(param) {
    switch (param) {
      case 'By A-Z':
        this.apiService.getDataCharacters('', this.limit, '', 'name')
          .pipe(
            tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results
            ),
            takeUntil(this.destroy$)
          )
          .subscribe();
        break;
      case 'By Z-A':
        this.apiService.getDataCharacters('', this.limit, '', '-name')
          .pipe(
            tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results),
            takeUntil(this.destroy$)
          )
          .subscribe();
        break;
      case 'By Modify':
        this.apiService.getDataCharacters('', this.limit, '', 'modified')
          .pipe(
            tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results),
            takeUntil(this.destroy$)
          )
          .subscribe();
        break;
      default:
        this.apiService.getDataCharacters('', this.limit, '', 'name')
          .pipe(
            tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results),
            takeUntil(this.destroy$)
          )
          .subscribe();
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
}
