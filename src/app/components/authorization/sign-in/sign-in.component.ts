import { Component, OnInit } from '@angular/core';
import { dataLocalStorage } from './dataLocalStorage';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public login: string = '';
  public pass: string = '';
  public dataLocalStorage: dataLocalStorage;

  constructor() { }

  ngOnInit(): void { }

  signIn() {
    const user = {
      login: this.login,
      pass: this.pass
    };
    localStorage.setItem('userData', JSON.stringify(user));
    this.dataLocalStorage = JSON.parse(localStorage.getItem('userData'));
    this.login = '';
    this.pass = '';
    alert('Success');
  }
}
