import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Album } from '../models/album.model';
import { ApiService } from './api-service';

@Injectable()
export class DataService {

  ready = false;
  albums: Album[];
  genres: Category[];
  artists: Category[];

  private subjectStatus = new Subject<any>();
  subjectTransactions: any;

  constructor(private api: ApiService) {
    this.api.getAlbums().subscribe((result) => {
      this.init(result);
    });
  }

  init(input: any) {
    console.log('input', input);
    this.albums = Album.fromJsonArray(input['response']['docs']);
    console.log('albums', this.albums);

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

    console.log('genres', this.genres);
    console.log('artists', this.artists);
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

  getAlbumsByCategory(category: string, value: string, limit: number = 100): Album[] {
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
    console.log('aaa', albums);
    return albums;
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
    for (const album of this.albums) {
      if (album.pid == pid) {
        return album;
      }
    }
    return null;
  }
  

  watchStatus(): Observable<any> {
    return this.subjectStatus.asObservable();
}


}

interface Category {
    value: string;
    count: number;
    type?: string;
}