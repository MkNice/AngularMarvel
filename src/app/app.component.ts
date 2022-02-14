import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public data;

  constructor() {
    this.data = localStorage.getItem('login');
  }
  logOut() {
    localStorage.clear();
    this.data = ''
  }
}
