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
import { AvatarComponent } from './components/account/avatar/avatar.component';
import { LoginComponent } from './components/account/login/login.component';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { AngularTokenModule } from 'angular-token';
import { environment } from 'src/environments/environment';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { GenresComponent } from './components/genres/genres.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { LibraryService } from './services/library-service';
import { AlbumsLibraryComponent } from './components/library/albums-library/albums-library.component';
import { ArtistsLibraryComponent } from './components/library/artists-library/artists-library.component';
import { EmbedComponent } from './components/embed/embed.component';

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
    SimpleDialogComponent,
    AvatarComponent,
    LoginComponent,
    SidebarComponent,
    PlaylistComponent,
    GenresComponent,
    ArtistsComponent,
    AlbumsLibraryComponent,
    ArtistsLibraryComponent,
    EmbedComponent
  ],
  imports: [
    // CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularTokenModule.forRoot({
      apiBase: environment.apiBase,
      oAuthBase: environment.apiBase,
      oAuthCallbackPath: 'omniauth',
      oAuthPaths: {
        google: 'auth/google_oauth2'
      },
      oAuthWindowType: 'newWindow'
    })
  ],
  providers: [
    ApiService,
    DataService,
    PlayerService,
    PlaylistService,
    AuthService,
    LocalStorageService,
    LibraryService
  ],
  entryComponents: [
    SimpleDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
