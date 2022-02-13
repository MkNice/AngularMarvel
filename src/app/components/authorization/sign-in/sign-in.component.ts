import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public login: string = '';
  public pass: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  signIn() {
    console.log(this.login);
    console.log(this.pass);
  }
}
