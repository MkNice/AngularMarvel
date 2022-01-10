import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarvelCharacters } from 'src/app/share/interfaces/interface-marvel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {

  public hero: string = '';
  public response: any;
  public subscription: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  search() {
    this.subscription = this.http.get(`${environment['LINK_MARVEL']}/characters?name=${this.hero}&ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`)
      .subscribe(response => {
        this.response = response;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
