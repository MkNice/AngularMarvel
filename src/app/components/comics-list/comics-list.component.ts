import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { MarvelService } from 'src/app/share/services/marvel.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit, OnDestroy {

  public marvelHeroes: MarvelCharacters[] = [];
  public subscriptions: Subscription[] = [];
  public loading: boolean = true;
  public extraInfo: boolean = false;

  constructor(public marvelService: MarvelService) { }

  ngOnInit() {
    const subscriptions = this.marvelService.fetchMarvel()
      .pipe(
        delay(1000),
        tap((heroes: DataMarvel) => this.marvelHeroes = heroes.data.results),

      )
      .subscribe(() => {
        this.loading = false;
      });
    this.subscriptions.push(subscriptions);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe()); // Можно через forEach, а можно через ...  takeUntil()... destroy until
  }

}
