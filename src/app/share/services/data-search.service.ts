import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSearchService {

  public dataMarvel: any; // dataMarvel

  constructor() { }

  getData(){
    return this.dataMarvel;
  }
  setData(data){
    this.dataMarvel = data;
  }
}
