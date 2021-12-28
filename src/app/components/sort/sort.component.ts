import { Component, OnInit } from '@angular/core';
import { MarvelService } from 'src/app/share/services/marvel.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  constructor(public heroes : MarvelService) { }

  ngOnInit(): void {
  }
  sort(){
    this.heroes.marvelHeroes.reverse()
  }
}
