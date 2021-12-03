import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import { ApiService } from './api-service';
import { DataService } from './data-service';

@Injectable()
export class LibraryService {

  albumsPids: string[];
  artists: string[];

  constructor(private api: ApiService, private data: DataService) {

  }

  isAlbumInLibrary(album: Album): boolean {
    if (!this.albumsPids) {
      return false;
    }
    return this.albumsPids.indexOf(album.pid) >= 0;
  }

  addAlbumToLibrary(album: Album) {
    this.albumsPids.push(album.pid);
    this.api.addAlbumToLibrary(album).subscribe(() => {

    });
  }

  removeAlbumFromLibrary(album: Album) {
    this.albumsPids.splice(this.albumsPids.indexOf(album.pid), 1);
    this.api.removeAlbumFromLibrary(album).subscribe(() => {
      
    });
  }


  isArtistInLibrary(artist: string): boolean {
    if (!this.artists) {
      return false;
    }
    return this.artists.indexOf(artist) >= 0;
  }


  addArtistToLibrary(artist: string) {
    this.artists.push(artist);
    this.api.addArtistToLibrary(artist).subscribe(() => {

    });
  }

  removeArtistFromLibrary(artist: string) {
    this.artists.splice(this.artists.indexOf(artist), 1);
    this.api.removeArtistFromLibrary(artist).subscribe(() => {
      
    });
  }

  load() {
    this.api.getLibraryAlbums().subscribe((pids: string[]) => {
      this.albumsPids = pids;
    });
    this.api.getLibraryArtists().subscribe((artists: string[]) => {
      this.artists = artists;
    });
  }

  getAlbums(): Album[] {
    if (!this.albumsPids) {
      return [];
    }
    const albums = [];
    for (const pid of this.albumsPids) {
      albums.push(this.data.getAlbumByPid(pid));
    }
    return albums;
  }

  getArtists(): string[] {
    if (!this.artists) {
      return [];
    }
    return this.artists;
  }

}
