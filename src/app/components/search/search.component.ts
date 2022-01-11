import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {

  private hero: string = '';
  private response: any;
  private subscriptions: Subscription[] = [];
  /*
    private navigationExtras: NavigationExtras = {
      queryParamsHandling: 'preserve',
      preserveFragment: true
    };
  */
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() { }

  search() {

    const subs = this.http.get(`${environment['LINK_MARVEL']}/characters?name=${this.hero}&ts=1&hash=${environment['HASH']}&apikey=${environment['PUBLIC_KEY']}`)
      .subscribe(response => {
        this.response = response;
      });
    this.subscriptions.push(subs);
    this.router.navigate(['search'], { queryParams: { search: subs }, queryParamsHandling: 'preserve' });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
