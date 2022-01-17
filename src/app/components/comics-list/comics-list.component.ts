import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { DataMarvel } from 'src/app/share/interfaces/interface-data';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit, OnDestroy {

  public marvelComics: MarvelCharacters[] = [];
  private destroy$: ReplaySubject<number> = new ReplaySubject<number>(1);
  public linkComics: string = 'comics?';

  constructor(public apiService: APIService) { }

  ngOnInit(): void {
    const requestString: string = 'comics?limit=5';

    this.apiService.getData(requestString).pipe(
      tap((data: DataMarvel) => {
        this.marvelComics = data.data.results;
        console.log(data);
      }),
      takeUntil(this.destroy$)
    )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
  }
  nextComics(comics) {
    this.marvelComics = comics;
  }
}
