import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { APIService } from 'src/app/share/services/api.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit {

  public marvelComics: [] = []

  constructor(public apiService: APIService) { }

  ngOnInit(): void {
    const requestString: string = '/comics'
    this.apiService.getData(requestString).pipe(
      tap((data)=> console.log(data))
    )
  }



}
