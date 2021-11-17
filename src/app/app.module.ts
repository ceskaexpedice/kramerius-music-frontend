import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { ApiService } from './services/api-service';
import { DataService } from './services/data-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ArtistComponent } from './components/artist/artist.component';
import { GenreComponent } from './components/genre/genre.component';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { AlbumComponent } from './components/album/album.component';
import { PlayerService } from './services/player-service';
import { PlayerComponent } from './components/player/player.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './components/app.component';
import { SearchComponent } from './components/search/search.component';
import { SimpleDialogComponent } from './dialogs/simple-dialog/simple-dialog.component';
import { PlaylistService } from './services/playlist-service';

@NgModule({
  declarations: [
    AppComponent,
    AlbumCardComponent,
    HomeComponent,
    ArtistComponent,
    GenreComponent,
    AlbumComponent,
    PlayerComponent,
    NavbarComponent,
    SearchComponent,
    SimpleDialogComponent

  ],
  imports: [
    // CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    ApiService,
    DataService,
    PlayerService,
    PlaylistService
  ],
  entryComponents: [
    SimpleDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
