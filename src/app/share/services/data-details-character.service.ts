import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataDetailsCharacterService {

  public dataMoreInfo: any; // Дописать интерфейса DataMarvel и засунть сюда вместо any, ну и в moreInfo и heroes-list. Либо создать новый интерефейс.

  constructor() { }

  getDataMoreInfo(){
    return this.dataMoreInfo;
  }
  setDataMoreInfo(data){
    this.dataMoreInfo = data;
  }
}
