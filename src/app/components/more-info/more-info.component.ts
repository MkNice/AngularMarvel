import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { charactersSelector, dataLoadCharacters } from 'src/app/reducers/marvelCharacters';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';


@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  public characters$: Observable<IMarvelCharacters[]> = this.store.select(charactersSelector);

  public selectedNameHero: string;

  constructor(private store: Store, private routerActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.routerActive.queryParams.subscribe((obj) => this.selectedNameHero = obj.name);
    this.store.dispatch(dataLoadCharacters({ params: { name: this.selectedNameHero } }));
  }
}
