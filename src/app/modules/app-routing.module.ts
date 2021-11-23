import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/account/login/login.component';
import { OmniauthComponent } from '../components/account/omniauth/omniauth.component';
import { AlbumComponent } from '../components/album/album.component';
import { ArtistComponent } from '../components/artist/artist.component';
import { GenreComponent } from '../components/genre/genre.component';
import { HomeComponent } from '../components/home/home.component';
import { SearchComponent } from '../components/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artist/:artist', component: ArtistComponent },
  { path: 'genre/:genre', component: GenreComponent },
  { path: 'album/:pid', component: AlbumComponent },
  { path: 'search', component: SearchComponent },

  { path: 'login', component: LoginComponent },
  { path: 'omniauth', component: OmniauthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
