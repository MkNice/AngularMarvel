import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { charactersSelector, dataLoad } from 'src/app/reducers/marvelCharacters';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';
import { DataSearchService } from 'src/app/share/services/data-search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  public characters$ = this.store.select(charactersSelector);
  public searchString: string = '';
  public selectedHero: any;
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    private store: Store,
    private routerActive: ActivatedRoute,
    private router: Router,
    private dataDetails: DataDetailsCharacterService) { }

  ngOnInit(): void {
    this.routerActive.queryParams.subscribe((obj) => this.searchString = obj.name),
      takeUntil(this.destroy$);
    this.store.dispatch(dataLoad({ heroName: this.searchString }));
  }
  ngOnDestroy() {
    this.destroy$.next();
  }
  moreInfo(hero: any) {
    this.selectedHero = hero;
    this.dataDetails.setDataMoreInfo(this.selectedHero);
    this.router.navigate(['moreInfo']);
  }
}
