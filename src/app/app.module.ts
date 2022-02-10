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
import { ComicsListComponent } from './components/comics-list/comics-list.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './reducers';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { APIService } from './share/services/api.service';
import { AppEffects } from './effects/AppEffects';
import { ComicsCharactersRowComponent } from './share/comics-characters-row/comics-characters-row.component';
import { LoaderComponent } from './share/loader/loader.component';


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
    ComicsListComponent,
    NotfoundComponent,
    MoreInfoComponent,
    SearchResultComponent,
    ComicsCharactersRowComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
