import { Component, OnInit } from '@angular/core';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { Router } from '@angular/router';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';
import { Store } from '@ngrx/store';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, dataLoad } from 'src/app/reducers/marvelCharacters';
import { SortDataService } from './sort-data.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {

  //Store
  public loading$ = this.store.select(charactersLoadingSelector);
  public characters$ = this.store.select(charactersSelector);
  public error$ = this.store.select(charactersErrorSelector);

  //Old files
  public marvelHeroes: MarvelCharacters[] = [];
  public linkCharacters: string = 'characters?'; // !!! Need for pagination
  public selectedHero: MarvelCharacters;

  constructor(
    private router: Router,
    private dataDetails: DataDetailsCharacterService,
    private sortService: SortDataService,
    private store: Store) { }

  ngOnInit() {
    this.store.dispatch(dataLoad({ heroName: '' }));
  }
  nextPage(heroes) {
    this.characters$ = heroes;
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
