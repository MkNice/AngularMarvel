import { Component, OnInit } from '@angular/core';
import { IMarvelCharacters } from '../share/interfaces/interface-marvel';
import { DataDetailsCharacterService } from '../share/services/data-details-character.service';

@Component({
  selector: 'app-more-info-result',
  templateUrl: './more-info-result.component.html',
  styleUrls: ['./more-info-result.component.scss']
})
export class MoreInfoResultComponent implements OnInit {


  public character: IMarvelCharacters;

  constructor(private dataDetails: DataDetailsCharacterService) { }

  ngOnInit(): void {
    this.character = this.dataDetails.getDataMoreInfo();
    console.log(this.character + "Это типо результат");
  }
}
