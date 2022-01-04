import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { delay, tap, takeUntil } from 'rxjs/operators';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit, OnDestroy {

  public marvelHeroes: MarvelCharacters[] = [];
  public subscriptions: Subscription[] = [];
  public loading: boolean = true;

  constructor(public marvelService: MarvelService) { }

  ngOnInit() {
    const subs = this.marvelService.fetchMarvel()
      .pipe(
        delay(1000),
        tap((heroes: DataMarvel) => this.marvelHeroes = heroes.data.results),

      )
      .subscribe(() => {
        this.loading = false;
      });
    this.subscriptions.push(subs);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe()); // Можно через forEach, а можно через ...  takeUntil()... destroy until
  }

}
