import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { charactersSelector, dataLoadCharacters } from 'src/app/reducers/marvelCharacters';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public searchString: string = '';
  public selectedHero$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);
  public result: boolean = false;

  constructor(private routerActive: ActivatedRoute, private store: Store) { }

  ngOnInit(): void {
    this.search();
  }
  search() {
    this.routerActive.queryParams.subscribe((obj) => this.searchString += obj.name);
    if (this.searchString.length === 0) {
      this.result = true;
      this.selectedHero$ = null;
    } else {
      this.store.dispatch(dataLoadCharacters({ searchName: this.searchString }));
    }
  }
  back() {
    window.history.back();
  }
}
