/* eslint-disable no-cond-assign */
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { APIService } from 'src/app/share/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  public sortValue: string = '';
  public requestString: string = 'characters?';
  public filtered: any;

  constructor(private apiService: APIService) { }

  setSortValue(value) {
    this.sortValue = value;
  }
  getDataForFilter() {
    return this.apiService.getData(this.requestString).pipe(
      tap((data: any) => this.filtered = data.data.results)
    );
  }

  sort() {
    // eslint-disable-next-line no-constant-condition
    switch (this.sortValue) {
      case 'By A-Z':
        this.getDataForFilter();
        this.filtered.reverse();
        break;
      case 'By Z-A':
        this.getDataForFilter();
        this.filtered.reverse();
        break;
      default:
        alert('Can`t sorting')
        break;
    }
  }

}