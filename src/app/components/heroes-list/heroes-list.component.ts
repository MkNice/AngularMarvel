import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  public loading: boolean = true;
  public searchString: string = '';
  allCharacters: Observable<any>;

  constructor(public marvelService: MarvelService) { }

  ngOnInit() {
    this.getCharacters();
  }
  getCharacters() {
    this.allCharacters = this.marvelService.getAllCharacters();
  }
  ngOnDestroy() {
    // this.subscription.unsubscribe();

  }
}





/*this.subscription = this.marvelService.fetchMarvel()
 .subscribe(response => {
  this.response = response;
  this.loading = false;
  console.log(this.response);
});*/

/*

  ngOnInit() {
    this.subscription = this.todosService.fetchTodos()
      .pipe(delay(1000))
      .subscribe(() => {
        this.loading = false;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onChange(id: number) {
    this.todosService.onToggle(id);
  }
  removeTodo(id: number) {
    this.todosService.removeTodo(id);
  }
}

*/