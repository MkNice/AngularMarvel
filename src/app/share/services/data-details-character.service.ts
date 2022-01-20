import { Injectable } from '@angular/core';
import { DataMarvel } from '../interfaces/interface-data';

@Injectable({
  providedIn: 'root'
})
export class DataDetailsCharacterService {

  public dataMoreInfo: DataMarvel[];

  constructor() { }

  getDataMoreInfo(){
    return this.dataMoreInfo;
  }
  setDataMoreInfo(data){
    this.dataMoreInfo = data;
  }
}
