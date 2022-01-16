import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicsComponent } from './components/comics/comics.component';
import { MarvelComponent } from './components/marvel/marvel.component';
import { MoreInfoComponent } from './components/more-info/more-info.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SearchResultComponent } from './components/search-result/search-result.component';


const routes: Routes = [
  {
    path: 'home',
    component: MarvelComponent,
  },
  {
    path: 'comics',
    component: ComicsComponent
  },
  {
    path: 'search-result',
    component: SearchResultComponent,
  },
  {
    path: 'moreInfo',
    component: MoreInfoComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
