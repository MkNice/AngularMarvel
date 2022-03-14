import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  public loginName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }
}
