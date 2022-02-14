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

  public signIn() {
    const login = localStorage.getItem('login');
    const pass = localStorage.getItem('pass');
    if(this.login === login && this.pass === pass){
      alert('Success');
      this.login = '';
      this.pass = '';
    } else { alert('User can`t found')}
  }
}
