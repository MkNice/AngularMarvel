import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { IDataMarvel } from 'src/app/share/interfaces/interface-data';
import { Router } from '@angular/router';
import { APIService } from 'src/app/share/services/api.service';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';
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
    private router: Router,
    private dataDetails: DataDetailsCharacterService,
    private sortService: SortDataService) { }

  ngOnInit() {

    this.apiService.getDataCharacters('3-d Man')
      .pipe(
        tap((heroes: IDataMarvel) => this.marvelHeroes = heroes.data.results),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loading = false;
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
  }

  nextPage(heroes: IMarvelCharacters[]) {
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
  moreInfo(hero: IMarvelCharacters) {
    this.selectedHero = hero;
    this.dataDetails.setDataMoreInfo(this.selectedHero);
    this.router.navigate(['moreInfo']);
  }
}
