import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataSearchService } from 'src/app/share/services/data-search.service';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public searchString: string = '';
  public response: any;

  constructor(private dataSearchService: DataSearchService, private http: HttpClient, public marvelService: MarvelService) { }

  ngOnInit(): void {

    this.searchString = this.dataSearchService.getData();
    this.search();
  }
  search() {
    this.marvelService.fetchCharacters(this.searchString)
      .subscribe(response => {
        this.response = response;
        console.log(response);
      });
      
  }
}


