import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SortCharacters } from 'src/app/share/interfaces/interface-sort';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})

export class SortComponent implements OnInit {

  @Output() selectedOption = new EventEmitter<string>();

  public valueOption: string = '';
  public filterCharacters: SortCharacters[] = [
    { name: "By A-Z" },
    { name: "By Z-A" },
    { name: "By Modify" }
  ];

  constructor() { }

  ngOnInit(): void { }

  emitvalue() {
    this.selectedOption.emit(this.valueOption);
  }
}
