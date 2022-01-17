import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { takeUntil, tap } from 'rxjs/operators';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';
import { Router } from '@angular/router';
import { DataSearchService } from 'src/app/share/services/data-search.service';
import { APIService } from 'src/app/share/services/api.service';

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

  constructor(public apiService: APIService, public router: Router, public dataSearch: DataSearchService) { }

  ngOnInit() {
    const requestString: string = 'characters?';

    this.apiService.getData(requestString)
      .pipe(
        tap((heroes: DataMarvel) => this.marvelHeroes = heroes.data.results),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loading = false;
      });
  }
  nextHeroes(heroes) {
    this.marvelHeroes = heroes;
  }
  ngOnDestroy() {
    this.destroy$.next();
  }

  moreInfo() {
    this.dataSearch.setData(this.marvelHeroes);
    this.router.navigate(['moreInfo']);
  }
}
