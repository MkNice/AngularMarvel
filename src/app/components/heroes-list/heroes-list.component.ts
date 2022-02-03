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
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  public linkCharacters: string = 'characters?limit=5&';
  public selectedHero: IMarvelCharacters;

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

  pagination() {
   // const offset: string = `${(pageNumber * this.itemsPerPage) - 5}`;

    this.apiService.getDataCharacters('', '5', ) //offset
      .pipe(
        tap((nextData: IDataMarvel) => {
          nextData.data.results;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  nextPage(heroes: IMarvelCharacters[]) {
    this.marvelHeroes = heroes;
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
        this.apiService.getDataCharacters('', '5', '', 'name')
          .pipe(
            tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results
            ),
            takeUntil(this.destroy$)
          )
          .subscribe();
        break;
      case 'By Z-A':
        this.apiService.getDataCharacters('', '5', '', '-name')
          .pipe(
            tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results),
            takeUntil(this.destroy$)
          )
          .subscribe();
        break;
      case 'By Modify':
        this.apiService.getDataCharacters('', '5', '', 'modified')
          .pipe(
            tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results),
            takeUntil(this.destroy$)
          )
          .subscribe();
        break;
      default:
        this.apiService.getDataCharacters('', '5', '', 'name')
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
