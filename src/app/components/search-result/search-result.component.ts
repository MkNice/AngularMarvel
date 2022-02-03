import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { charactersSelector, dataLoad } from 'src/app/reducers/marvelCharacters';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  public characters$: Observable<IMarvelCharacters[]>= this.store.select(charactersSelector);
  public searchString: string = '';
  public selectedHero: IMarvelCharacters;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    private store: Store,
    private routerActive: ActivatedRoute,
    private router: Router,
    private dataDetails: DataDetailsCharacterService) { }

  ngOnInit(): void {
    this.routerActive.queryParams.subscribe((obj) => this.searchString += obj.type + obj.name ),
      takeUntil(this.destroy$); // !! useless mb...Later return
    this.store.dispatch(dataLoad({ requestString: this.searchString }));
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
  public moreInfo(hero: IMarvelCharacters) {
    this.selectedHero = hero;
    this.dataDetails.setDataMoreInfo(this.selectedHero);
    this.router.navigate(['moreInfo']);
  }
}
