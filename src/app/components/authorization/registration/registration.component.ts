import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  public buyTicketForm: FormGroup;

  public constructor() { }

  ngOnInit(): void {
    this._createForm();
  }
  private _createForm() {
    this.buyTicketForm = new FormGroup({
      fio: new FormControl(null),
      login: new FormControl(null),
      email: new FormControl(null),
      pass: new FormControl(null),
      phone: new FormControl(null),
    });
  }

  public registration(): void {
    console.log('Вы успешно зарегистрировались');
  }
}
