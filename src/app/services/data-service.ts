import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Album } from '../models/album.model';
import { Track } from '../models/track.model';
import { ApiService } from './api-service';

@Injectable()
export class DataService {

  lastSearchQuery = "";
  lastSearchOnlyPublic = false;

  ready = false;
  albums: Album[];
  albumsMap: {[ key: string]: Album } = {};
  genres: Category[];
  artists: Category[];

  private subjectStatus = new Subject<any>();

  constructor(private api: ApiService) {
    this.api.getAlbums().subscribe((result) => {
      this.init(result);
    });
  }

  init(input: any) {
    this.albums = Album.fromJsonArray(input);
    for (const album of this.albums) {
      this.albumsMap[album.pid] = album;
    }
    this.genres = [];
    this.artists = [];
    const genresMap: any = {};
    const artistsMap: any = {};
    for (const album of this.albums) {
      for (const artist of album.artists) {
        if (artistsMap[artist]) {
          artistsMap[artist].count += 1;
        } else {
          const c: Category = {
            value: artist,
            count: 1
          }
          this.artists.push(c);
          artistsMap[c.value] = c;
        }
      }
      for (const genre of album.genres) {
        if (genresMap[genre]) {
          genresMap[genre].count += 1;
        } else {
          const c: Category = {
            value: genre,
            count: 1
          }
          this.genres.push(c);
          genresMap[c.value] = c;
        }
      }
    }
    this.genres.sort((a,b) => {
      return b.count - a.count;
    });
    this.artists.sort((a,b) => {
      return b.count - a.count;
    });
    this.ready = true;
    this.subjectStatus.next();
  }

  // private parseCategory(solr: any, category: string): Category[] {
  //   const categories: Category[] = [];
  //   const facetFields = solr['facet_counts']['facet_fields'][category];
  //   for (let i = 0; i < facetFields.length; i += 2) {
  //       const value = facetFields[i];
  //       if (!value) {
  //           continue;
  //       }
  //       const count = facetFields[i + 1];
  //       categories.push({
  //         value: value,
  //         count: count
  //       });
  //   }
  //   return categories;
  // }


  getTracks(album: Album, callback: (track: Track[]) => void) {
    this.api.getTracks(album).subscribe(response => {
      // const units:string[] = [];
      const tracks = Track.fromJsonArray(response);
      for (const track of tracks) {
        // if (units.indexOf(track.unitPid) < 0) {
        //   units.push(track.unitPid);
        // }
        track.album = album;
      }
      callback(tracks);
      // if (units.length == 0) {
      //   callback(tracks);
      // } else {
      //   this.api.getUnits(units).subscribe((response) => {
      //     const uMap: {[ key: string]: Unit } = {};
      //     for (const u of response['response']['docs']) {
      //       uMap[u['PID']] = Unit.fromJson(u);
      //     }
      //     for (const track of tracks) {
      //       track.unit = uMap[track.unitPid];
      //     }
      //     console.log('tracks', tracks);
      //     callback(tracks);
      //   });
      // }
    });
  }

  findTracks(query: string, onlyPublic: boolean, callback: (track: Track[]) => void) {
    this.api.findTracks(query, onlyPublic, 10).subscribe(response => {
      // const units: string[] = [];
      const tracks = Track.fromJsonArray(response);
      for (const track of tracks) {
        // if (units.indexOf(track.unitPid) < 0) {
        //   units.push(track.unitPid);
        // }
        for (const album of this.albums) {
          if (album.pid == track.albumPid) {
            track.album = album;
            break;
          }
        }
        if (!track.album) {
          console.log('track without album', track);
        }
      }
      callback(tracks);
    });
  }


  getAlbumsByCategory(category: string, value: string, limit: number = 500): Album[] {
    const albums: Album[] = [];
    for (const album of this.albums) {
      if (category == 'artist' && album.artists.includes(value)) {
        albums.push(album);
      } else if (category == 'genre' && album.genres.includes(value)) {
        albums.push(album);
      }
      if (albums.length >= limit) {
        return albums;
      }
    }
    return albums;
  }

  getAlbumsByQuery(query: string, onlyPublic: boolean, limit: number) : Album[] {
    const albums: Album[] = [];
    if (!query) {
      return albums;
    }
    for (const album of this.albums) {
      if (album.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0) {
        if (!onlyPublic || !album.isPrivate) {
          albums.push(album);
        }
      }
      if (albums.length >= limit) {
        return albums;
      }
    }
    return albums;
  }
  

  getArtistsByQuery(query: string, limit: number = 10): Category[] {
    const categories: Category[] = [];
    if (!query) {
      return categories;
    }
    let i = 0;
    for (const category of this.artists) {
      if (category.value.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0) {
        categories.push(category);
        if (categories.length >= limit) {
          return categories;
        }
      }
    }
    return categories;
  }

  getGenresByQuery(query: string, limit: number = 10): Category[] {
    const categories: Category[] = [];
    if (!query) {
      return categories;
    }
    let i = 0;
    for (const category of this.genres) {
      if (category.value.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >= 0) {
        categories.push(category);
        if (categories.length >= limit) {
          return categories;
        }
      }
    }
    return categories;
  }

 
  getTopGenres(limit: number = 10) {
    const categories: Category[] = [];
    let i = 0;
    while (i < limit && i < this.genres.length) {
      categories.push(this.genres[i]);
      i++;
    }
    return categories;
  }

  getTopArtists(limit: number = 10) {
    const categories: Category[] = [];
    let i = 0;
    while (i < limit && i < this.artists.length) {
      categories.push(this.artists[i]);
      i++;
    }
    return categories;
  }

  getAlbumByPid(pid: string): Album {
    if (!this.albums) {
      return null;
    }
    return this.albumsMap[pid];
  }
  
  watchStatus(): Observable<any> {
    return this.subjectStatus.asObservable();
}


}

export interface Category {
    value: string;
    count: number;
    type?: string;
}