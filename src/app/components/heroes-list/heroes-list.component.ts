import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { takeUntil, tap } from 'rxjs/operators';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';
import { Router } from '@angular/router';
import { DataSearchService } from 'src/app/share/services/data-search.service';
import { APIService } from 'src/app/share/services/api.service';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit, OnDestroy {

  public marvelHeroes: MarvelCharacters[] = [];
  public loading: boolean = true;
  public extraInfo: boolean = false;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  public linkCharacters: string = 'characters?';
  public selectedHero: any;

  constructor(private apiService: APIService, private router: Router, private dataDetails: DataDetailsCharacterService) { }

  ngOnInit() {
    const requestString: string = 'characters?limit=5';

    this.apiService.getData(requestString)
      .pipe(
        tap((heroes: DataMarvel) => this.marvelHeroes = heroes.data.results),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loading = false;
      });
  }
  nextPage(heroes) {
    this.marvelHeroes = heroes;
  }
  ngOnDestroy() {
    this.destroy$.next();
  }

  moreInfo(hero: any) {
    this.selectedHero = hero;
    this.dataDetails.setDataMoreInfo(this.selectedHero);
    this.router.navigate(['moreInfo']);
  }
}
