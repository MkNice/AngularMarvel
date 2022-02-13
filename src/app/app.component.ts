import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public data;

  constructor() {
    this.data = JSON.parse(localStorage.getItem('userData'));
  }
  logOut() {
    localStorage.clear();
    this.data = ''
  }
}
