import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMarvelCharacters } from '../interfaces/interface-marvel';

@Component({
  selector: 'app-comics-characters-row',
  templateUrl: './comics-characters-row.component.html',
  styleUrls: ['./comics-characters-row.component.scss']
})
export class ComicsCharactersRowComponent implements OnInit {

  @Input() data: IMarvelCharacters;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  moreInfo(hero: IMarvelCharacters) {
    this.router.navigate(['moreInfo'], { queryParams: { name: hero.name } });
  }
}
