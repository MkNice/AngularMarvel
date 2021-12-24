import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public loading: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

/*
export class HeroesListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  public loading: boolean = true;
  constructor(public marvelService: MarvelService) { }

  constructor() { }

  ngOnInit(): void {
  }

}

*/