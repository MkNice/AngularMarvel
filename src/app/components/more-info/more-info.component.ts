import { Component, OnInit } from '@angular/core';
import { IMarvelCharacters } from 'src/app/share/interfaces/marvel.interface';
import { DataDetailsCharacterService } from 'src/app/share/services/data-details-character.service';


@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  public character: IMarvelCharacters;

  constructor(private dataDetails: DataDetailsCharacterService) { }

  ngOnInit(): void {
    this.character = this.dataDetails.getDataMoreInfo();
  }
  backPage(){
    window.history.back()
  }
}
