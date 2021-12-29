import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit, OnDestroy {

  public subscription: Subscription;
  public loading: boolean = true;

  constructor(public marvelService: MarvelService) { }

  ngOnInit() {
    this.subscription = this.marvelService.fetchMarvel()
      .pipe(delay(1000))
      .subscribe(() => {
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
