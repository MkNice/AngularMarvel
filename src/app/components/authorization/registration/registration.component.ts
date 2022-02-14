import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  public user: FormGroup;

  public constructor() { }

  ngOnInit(): void {
    this._createForm();
  }
  private _createForm() {
    this.user = new FormGroup({
      fio: new FormControl(null),
      login: new FormControl(null),
      email: new FormControl(null),
      pass: new FormControl(null),
      phone: new FormControl(null),
    });
  }

  public registration(): void {
    const fio = this.user.get('fio');
    const login = this.user.get('login');
    const email = this.user.get('email');
    const pass = this.user.get('pass');
    const phone = this.user.get('phone');
    localStorage.setItem('login', login.value);
    localStorage.setItem('pass', pass.value);
    localStorage.setItem('fio', fio.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('phone', phone.value);
  }
}
