import { Injectable } from '@angular/core';
import { IMarvelCharacters } from '../interfaces/interface-marvel';

@Injectable({
  providedIn: 'root'
})
export class DataDetailsCharacterService {

  public dataMoreInfo: IMarvelCharacters;

  constructor() { }

  getDataMoreInfo(){
    return this.dataMoreInfo;
  }
  setDataMoreInfo(data){
    this.dataMoreInfo = data;
  }
}
