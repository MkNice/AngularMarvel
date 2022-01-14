import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {

  public data: any; // DataMarvel

  constructor() { }

  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
  }
}
