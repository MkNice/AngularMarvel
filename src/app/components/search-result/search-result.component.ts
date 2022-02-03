import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDataMarvel } from 'src/app/share/interfaces/interface-data';
import { IMarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { APIService } from 'src/app/share/services/api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public searchString: string = '';
  public selectedHero: IMarvelCharacters[];

  constructor(private apiService: APIService, private routerActive: ActivatedRoute,) { }

  ngOnInit(): void {
    this.search();
  }
  search() {
    this.routerActive.queryParams.subscribe((obj) => this.searchString += obj.name),
      this.apiService.getDataCharacters(this.searchString)
        .subscribe((response: IDataMarvel) => {
          this.selectedHero = response.data.results;
        });
  }
}
