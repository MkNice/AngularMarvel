import { Injectable } from '@angular/core';
import { IMarvelCharacters } from '../interfaces/interface-marvel';

@Injectable({
  providedIn: 'root'
})
export class DataDetailsCharacterService {

  public dataMoreInfo: IMarvelCharacters;

  constructor() { }
  // !! убери ты эту помойку и сделай нормально
  public getDataMoreInfo() {
    return this.dataMoreInfo;
  }
  public setDataMoreInfo(data) {
    this.dataMoreInfo = data;
  }
}
