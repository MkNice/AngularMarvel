import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicsComponent } from './components/comics/comics.component';
import { MarvelComponent } from './components/marvel/marvel.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', component: MarvelComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
