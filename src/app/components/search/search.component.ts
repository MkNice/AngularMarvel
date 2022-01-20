import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { DataSearchService } from 'src/app/share/services/data-search.service';
import { APIService } from 'src/app/share/services/api.service';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {

  // TODO: make me stupid
  public hero: string = '';
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);

  constructor(
    private router: Router,
    private dataSearchService: DataSearchService,
    private apiService: APIService
  ) { }

  ngOnInit() { }

  search() {

    const searchString: string = `/characters?name=${this.hero}`;

    this.apiService.getData(searchString)
      .pipe(
        tap(() => {
          this.dataSearchService.setData(this.hero);
          this.router.navigate(['search-result']);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
