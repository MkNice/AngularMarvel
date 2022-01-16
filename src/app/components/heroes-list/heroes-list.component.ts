import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { delay, tap } from 'rxjs/operators';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';
import { Router } from '@angular/router';
import { DataSearchService } from 'src/app/share/services/data-search.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit, OnDestroy {
  public marvelHeroes: MarvelCharacters[] = [];
  public subscriptions: Subscription[] = [];
  public loading: boolean = true;
  public extraInfo: boolean = false;

  constructor(public marvelService: MarvelService, public router: Router, public dataSearch: DataSearchService) { }

  ngOnInit() {
    const subs = this.marvelService.fetchCharacters()
      .pipe(
        tap((heroes: DataMarvel) => this.marvelHeroes = heroes.data.results),
      )
      .subscribe(() => {
        this.loading = false;
      });
    this.subscriptions.push(subs);
  }
  nextHeroes(message){
    this.marvelHeroes = message;
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  moreInfo() {
    this.dataSearch.setData(this.marvelHeroes);
    this.router.navigate(['moreInfo']);
  }
}
