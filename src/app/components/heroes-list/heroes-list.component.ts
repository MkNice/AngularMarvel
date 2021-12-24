import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { marvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})

export class HeroesListComponent implements OnInit {

  public subscription: Subscription;
  public loading: boolean = true;
  public searchString: string = '';
  public allCharacters: Observable<marvelCharacters>;

  constructor(public marvelService: MarvelService) { }

  ngOnInit() {
    this.getCharacters();
  }
  getCharacters() {
    this.allCharacters = this.marvelService.getAllCharacters();
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