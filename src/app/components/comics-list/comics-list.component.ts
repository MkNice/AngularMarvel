import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { IDataMarvel } from 'src/app/share/interfaces/interface-data';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit, OnDestroy {

  public marvelComics: IMarvelCharacters[] = [];
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  public linkComics: string = 'comics?limit=5&';

  constructor(private apiService: APIService) { }

  ngOnInit(): void {

    this.apiService.getDataComics().pipe(
      tap((data: IDataMarvel) => {
        this.marvelComics = data.data.results;
      }),
      takeUntil(this.destroy$)
    )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  nextPage(comics) {
    this.marvelComics = comics;
  }
}
