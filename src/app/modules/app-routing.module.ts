import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from '../components/album/album.component';
import { ArtistComponent } from '../components/artist/artist.component';
import { GenreComponent } from '../components/genre/genre.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artist/:artist', component: ArtistComponent },
  { path: 'genre/:genre', component: GenreComponent },
  { path: 'album/:pid', component: AlbumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
