import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/share/services/marvel.service';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  public page: number;
  public collectionSize: number;
  public heroes: MarvelCharacters[] = [];
  public itemsPerPage: number = 4;

  constructor(public marvelService: MarvelService) {
    this.page = 1;
    marvelService.fetchMarvelPagination(this.page, this.itemsPerPage)
      .subscribe(heroes => {
        this.heroes = heroes;
        this.collectionSize = marvelService.collectionSize;
      });
  }

  ngOnInit() { }

  onPageChanged(pageNumber) {
    console.log("page changed:" + pageNumber);
  }
}
