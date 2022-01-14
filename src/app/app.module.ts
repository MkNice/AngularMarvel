import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { MarvelComponent } from './components/./marvel/marvel.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicsHeaderComponent } from './components/comics-header/comics-header.component';
import { ComicsListComponent } from './components/comics-list/comics-list.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MarvelService } from './share/services/marvel.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './reducers';
import { MoreInfoComponent } from './components/more-info/more-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SortComponent,
    HeroesListComponent,
    MarvelComponent,
    PaginationComponent,
    ComicsComponent,
    ComicsHeaderComponent,
    ComicsListComponent,
    NotfoundComponent,
    MoreInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    StoreModule.forRoot(reducers), //(reducers,{metaReducers}) ....  {}, {}
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([])
  ],
  providers: [MarvelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
