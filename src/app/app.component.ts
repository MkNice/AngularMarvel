import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  hero: string = '';
  response: any;
  subscription : Subscription
  constructor(private http: HttpClient) { }

  search() {
    this.subscription = this.http.get('https://developer.marvel.com/v1/public/characters/'/* + this.hero */)
      .subscribe(response => {
        this.response = response;
        console.log(this.response);
      });
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
}
