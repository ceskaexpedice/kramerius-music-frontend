import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist.model';

@Injectable()
export class PlaylistService {

  playlists: Playlist[];

  constructor() {
    this.playlists = [];
  }  

}
