import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { DataSearchService } from 'src/app/share/services/data-search.service';
import { APIService } from 'src/app/share/services/api.service';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  public searchName: string = '';

  constructor(private router: Router) { }

  ngOnInit() { }

  search() {
    this.router.navigate(['search-result'], { queryParams: { name: this.searchName } });
  }
}
