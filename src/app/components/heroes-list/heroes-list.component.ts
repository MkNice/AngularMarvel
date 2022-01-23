import { Component, OnInit, OnDestroy } from '@angular/core';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { Router } from '@angular/router';
import { APIService } from 'src/app/share/services/api.service';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';
import { Store } from '@ngrx/store';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, dataLoad } from 'src/app/reducers/marvelCharacters';

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
  public selectedHero: any;

  constructor(
    private apiService: APIService,
    private router: Router,
    private dataDetails: DataDetailsCharacterService,
    private store: Store) { }

  ngOnInit() {
    this.store.dispatch(dataLoad({ heroName: '' }));
  }
  nextPage(heroes) {
    this.characters$ = heroes;
  }

  moreInfo(hero: any) {
    this.selectedHero = hero;
    this.dataDetails.setDataMoreInfo(this.selectedHero);
    this.router.navigate(['moreInfo']);
  }
}
