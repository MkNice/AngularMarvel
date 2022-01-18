import { Component, OnInit } from '@angular/core';
import { FilterDataService } from '../heroes-list/filter-data.service';
import { HeroesListComponent } from '../heroes-list/heroes-list.component';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})

export class SortComponent implements OnInit {

  public selectedOption: any;
  public filterCharacters: any = [
    { name: "By A-Z" },
    { name: "By Z-A" },
    { name: "By Modify" }
  ];

  constructor(private heroesList: HeroesListComponent, private filterData: FilterDataService) { }

  // делать запрос на сервак, сортировать данные и отправлять эти данные в компонент где и рисуем всех героев
  ngOnInit(): void {
    this.filterData.setSortValue(this.selectedOption)
  }

  sort() {
    this.heroesList.marvelHeroes.reverse();
  }
}
