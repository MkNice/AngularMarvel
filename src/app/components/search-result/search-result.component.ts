import { Component, OnInit } from '@angular/core';
import { IDataMarvel } from 'src/app/share/interfaces/interface-data';
import { APIService } from 'src/app/share/services/api.service';
import { DataSearchService } from 'src/app/share/services/data-search.service';
import { MarvelService } from 'src/app/share/services/marvel.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public searchString: string = '';
  public response: IDataMarvel;

  constructor(private dataSearchService: DataSearchService, private marvelService: MarvelService, private apiService: APIService) { }

  ngOnInit(): void {
    this.searchString = this.dataSearchService.getData();
    this.search();
  }
  search() {
    this.marvelService.fetchCharacters(this.searchString)
      .subscribe((response: IDataMarvel) => {
        this.response = response;
      });
  }
}
