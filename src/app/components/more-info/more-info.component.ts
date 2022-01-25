import { Component, OnInit } from '@angular/core';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';


@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  public character: MarvelCharacters;

  constructor(private dataDetails: DataDetailsCharacterService) { }

  ngOnInit(): void {
    this.character = this.dataDetails.getDataMoreInfo();
  }
}
