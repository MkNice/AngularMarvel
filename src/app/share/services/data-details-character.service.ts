import { Injectable } from '@angular/core';
import { MarvelCharacters } from '../interfaces/interface-marvel';

@Injectable({
  providedIn: 'root'
})
export class DataDetailsCharacterService {

  public dataMoreInfo: MarvelCharacters;

  constructor() { }
  // !! убери ты эту помойку и сделай нормально
  public getDataMoreInfo() {
    return this.dataMoreInfo;
  }
  public setDataMoreInfo(data) {
    this.dataMoreInfo = data;
  }
}
