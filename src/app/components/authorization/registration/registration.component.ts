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
    localStorage.setItem('userData', JSON.stringify(this.user.value))
  }
}
