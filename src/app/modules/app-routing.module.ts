import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/account/login/login.component';
import { OmniauthComponent } from '../components/account/omniauth/omniauth.component';
import { AlbumComponent } from '../components/album/album.component';
import { ArtistComponent } from '../components/artist/artist.component';
import { ArtistsComponent } from '../components/artists/artists.component';
import { EmbedComponent } from '../components/embed/embed.component';
import { GenreComponent } from '../components/genre/genre.component';
import { GenresComponent } from '../components/genres/genres.component';
import { HomeComponent } from '../components/home/home.component';
import { AlbumsLibraryComponent } from '../components/library/albums-library/albums-library.component';
import { ArtistsLibraryComponent } from '../components/library/artists-library/artists-library.component';
import { PlaylistComponent } from '../components/playlist/playlist.component';
import { SearchComponent } from '../components/search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artist/:artist', component: ArtistComponent },
  { path: 'genre/:genre', component: GenreComponent },
  { path: 'album/:pid', component: AlbumComponent },
  { path: 'search', component: SearchComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'artists', component: ArtistsComponent },

  { path: 'playlist/:uid', component: PlaylistComponent },

  { path: 'library/albums', component: AlbumsLibraryComponent },
  { path: 'library/artists', component: ArtistsLibraryComponent },

  { path: 'embed/:pid', component: EmbedComponent },

  { path: 'login', component: LoginComponent },
  { path: 'omniauth', component: OmniauthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
