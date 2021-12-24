import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { SortComponent } from './components/sort/sort.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { MarvelComponent } from './components/./marvel/marvel.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ComicsComponent } from './components/comics/comics.component';
import { ComicsHeaderComponent } from './components/comics-header/comics-header.component';
import { ComicsListComponent } from './components/comics-list/comics-list.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MarvelService } from './share/services/marvel.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MarvelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
