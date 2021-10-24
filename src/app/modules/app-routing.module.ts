import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from '../components/artist/artist.component';
import { GenreComponent } from '../components/genre/genre.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artist/:artist', component: ArtistComponent },
  { path: 'genre/:genre', component: GenreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
