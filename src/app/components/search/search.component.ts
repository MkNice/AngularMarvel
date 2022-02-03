import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() searchString: string = '';

  public searchName: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  public search() {
    this.router.navigate(['search-result'], { queryParams: { type: this.searchString, name:this.searchName } }); // ? ToDo сделяй нармальна
  }
}
