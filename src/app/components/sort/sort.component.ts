import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ISortCharacters } from 'src/app/share/interfaces/sort.interface';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})

export class SortComponent implements OnInit {

  @Output() selectedOption = new EventEmitter<string>();

  public valueOption: string = '';
  public filterCharacters: ISortCharacters[] = [
    { name: "By A-Z" },
    { name: "By Z-A" },
    { name: "By Modify" }
  ];

  constructor() { }

  ngOnInit(): void { }

  public emitvalue() {
    this.selectedOption.emit(this.valueOption);
  }
}
