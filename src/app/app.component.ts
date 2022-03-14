import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TestService } from './share/services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public data: string = '';

  constructor(private testService: TestService) {
    if (localStorage.getItem('userData')) {
      this.data = JSON.parse(localStorage.getItem('userData')).login;
    }
  }

  logOut() {
    localStorage.clear();
    this.data = '';
  }
  ngOnInit(): void {
    this.testService.loginName.pipe(
      tap((data: string) => {
        this.data = data;
      })
    ).subscribe();
  }
}
