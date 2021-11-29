import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist.model';
import { ApiService } from './api-service';

@Injectable()
export class PlaylistService {

  playlists: Playlist[] = [];

  constructor(private api: ApiService) {
  }  

  reload() {
    this.api.getPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
      this.sortPlaylists();
    });
  }

  addPlaylist(playlist: Playlist) {
    this.playlists.push(playlist);
    this.sortPlaylists();
  }

  removePlaylist(uid: string) {
    const playlist = this.getPlaylistByUid(uid);
    this.playlists.splice(this.playlists.indexOf(playlist), 1);
  }

  renamePlaylist(uid: string, title: string) {
    const playlist = this.getPlaylistByUid(uid);
    playlist.title = title;
    this.sortPlaylists();
  }

  private getPlaylistByUid(uid: string): Playlist {
    for (const playlist of this.playlists) {
      if (uid == playlist.uid) {
        return playlist;
      }
    }
    return null;
  }

  private sortPlaylists() {
    this.playlists.sort((a: Playlist, b: Playlist) => {
      return a.title.localeCompare(b.title);
    });
  }

}
