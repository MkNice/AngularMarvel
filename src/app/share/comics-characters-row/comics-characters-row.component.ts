import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMarvelCharacters } from '../interfaces/interface-marvel';
import { DataDetailsCharacterService } from '../services/data-details-character.service';

@Component({
  selector: 'app-comics-characters-row',
  templateUrl: './comics-characters-row.component.html',
  styleUrls: ['./comics-characters-row.component.scss']
})
export class ComicsCharactersRowComponent implements OnInit {

  @Input() dataMarvel: IMarvelCharacters;

  public selectedHero;

  constructor(private dataDetails: DataDetailsCharacterService, private router: Router) { }

  ngOnInit(): void { }

  moreInfo(hero: IMarvelCharacters) {
    this.selectedHero = hero;
    this.dataDetails.setDataMoreInfo(this.selectedHero);
    this.router.navigate(['moreInfo']);
  }
}
