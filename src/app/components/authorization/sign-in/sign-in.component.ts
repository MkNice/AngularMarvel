import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/share/services/test.service';
import { dataLocalStorage } from './dataLocalStorage.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public login: string = '';
  public pass: string = '';
  public dataLocalStorage: dataLocalStorage;

  constructor(private testService: TestService) { }

  ngOnInit(): void { }

  public signIn() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (this.login === userData.login && this.pass === userData.pass) {
      alert('Success');
      this.testService.loginName.next('Hello dear');
      this.login = '';
      this.pass = '';
    } else { alert('User can`t found'); }
  }
}
