import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist.model';
import { ApiService } from './api-service';

@Injectable()
export class PlaylistService {

  playlists: Playlist[] = [];

  constructor(private api: ApiService) {
    // this.playlists = [];
    this.api.getPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
      console.log('pl', playlists);
      this.sortPlaylists();
    });
  }  


  addPlaylist(playlist: Playlist) {
    this.playlists.push(playlist);
    this.sortPlaylists();
  }

  private sortPlaylists() {
    this.playlists.sort((a: Playlist, b: Playlist) => {
      return a.title.localeCompare(b.title);
    });
  }

}
