import { Component, OnInit } from '@angular/core';
import { DataSearchService } from 'src/app/share/services/data-search.service';
import { MarvelService } from 'src/app/share/services/marvel.service';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  public characters: any;

  constructor(public dataSearch: DataSearchService, public marvelServise: MarvelService) { }

  ngOnInit(): void {
    this.characters = this.dataSearch.getData()
  }

}
