import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/share/services/marvel.service';

const itemsPerPage: number = 4

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  public page: number;
  public collectionSize: number;
  public heroes: any

  constructor(public marvelService: MarvelService) {
    this.page = 1;
    marvelService.fetchMarvel(this.page, itemsPerPage)
      .subscribe(heroes => {
        this.heroes = heroes
        this.collectionSize = marvelService.marvelHeroes.length;
      });
  }

  ngOnInit() {
  }

  onPageChanged(pageNumber){
    console.log("page changed:" + pageNumber);
  }
}