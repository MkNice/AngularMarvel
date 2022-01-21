import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';
import { Router } from '@angular/router';
import { APIService } from 'src/app/share/services/api.service';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';
import { Store } from '@ngrx/store';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, dataLoad } from 'src/app/reducers/marvelCharacters';
import { SortDataService } from './sort-data.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit, OnDestroy {

  //Store
  public searchName: any = '';
  public loading$ = this.store.select(charactersLoadingSelector);
  public characters$ = this.store.select(charactersSelector);
  public error$ = this.store.select(charactersErrorSelector);

  public search = {
    searchName: ''
  };
  dataLoad() {
    this.store.dispatch(dataLoad({ heroName: this.searchName }));
  }

  //Old files
  public marvelHeroes: MarvelCharacters[] = [];
  public loading: boolean = true;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  public linkCharacters: string = 'characters?limit=5&';
  public selectedHero: MarvelCharacters;

  constructor(
    private apiService: APIService,
    private router: Router,
    private dataDetails: DataDetailsCharacterService,
    private sortService: SortDataService,
    private store: Store) { }

  ngOnInit() {

    this.apiService.getData(this.linkCharacters)
      .pipe(
        tap((heroes: DataMarvel) => this.marvelHeroes = heroes.data.results),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loading = false;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
  }

  nextPage(heroes: MarvelCharacters[]) {
    this.marvelHeroes = heroes;
  }

  dataFromSort(param) {
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
  moreInfo(hero: MarvelCharacters) {
    this.selectedHero = hero;
    this.dataDetails.setDataMoreInfo(this.selectedHero);
    this.router.navigate(['moreInfo']);
  }
}
