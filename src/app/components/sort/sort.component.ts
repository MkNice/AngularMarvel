import { Component, OnInit } from '@angular/core';
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

  constructor(private heroesList: HeroesListComponent) { }
  // делать запрос на сервак, сортировать данные и отправлять эти данные в компонент где и рисуем всех героев
  ngOnInit(): void {
  }

  sort() {
    this.heroesList.marvelHeroes.reverse();
  }
}
