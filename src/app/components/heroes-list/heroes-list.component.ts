import { Component, OnInit } from '@angular/core';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { Router } from '@angular/router';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';
import { Store } from '@ngrx/store';
import { charactersErrorSelector, charactersLoadingSelector, charactersSelector, dataLoad, dataPagination } from 'src/app/reducers/marvelCharacters';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {

  public loading$ = this.store.select(charactersLoadingSelector);
  public characters$ = this.store.select(charactersSelector);
  public error$ = this.store.select(charactersErrorSelector); // ? Придумать бы как бы юзать этот ерор
  public linkForSort: string = '/characters?limit=5&orderBy=';
  public linkCharacters: string = 'characters?'; // !!! Need for pagination
  public selectedHero: MarvelCharacters;

  constructor(
    private router: Router,
    private dataDetails: DataDetailsCharacterService,
    private store: Store) { }

  ngOnInit() {
    this.store.dispatch(dataLoad({ heroName: '' }));
  }
  public nextPage(heroes) {
    this.characters$ = heroes;
  }

  public dataFromSort(param) {
    const sortByAlphabetic: string = `${this.linkForSort}name&`;
    const sortByReverseAlphabetic: string = `${this.linkForSort}-name&`;
    const sortByModified: string = `${this.linkForSort}modified&`;

    switch (param) {
      case 'By A-Z':
        this.store.dispatch(dataPagination({ requestString: sortByAlphabetic }));
        break;
      case 'By Z-A':
        this.store.dispatch(dataPagination({ requestString: sortByReverseAlphabetic }));
        break;
      case 'By Modify':
        this.store.dispatch(dataPagination({ requestString: sortByModified }));
        break;
      default:
        this.store.dispatch(dataLoad({ heroName: '' }));
    }
  }
  public moreInfo(hero: MarvelCharacters) {
    this.selectedHero = hero;
    this.dataDetails.setDataMoreInfo(this.selectedHero);
    this.router.navigate(['moreInfo']);
  }
}
