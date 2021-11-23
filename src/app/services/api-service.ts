import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Album } from '../models/album.model';
import { Track } from '../models/track.model';
import { Playlist } from '../models/playlist.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {

  // private static apiUrl = 'https://kramerius.mzk.cz';

  private static apiUrl = 'http://localhost:3000/api';

  private static sources: any = {
    'mzk': 'https://kramerius.mzk.cz',
    'nm': 'https://kramerius.nm.cz',
    'kfbz': 'http://kramerius.kfbz.cz',
    'mlp': 'https://kramerius4.mlp.cz'
  };


  // private static apiUrl = 'https://kramerius.nm.cz';
  // private static apiUrl = 'https://kramerius4.mlp.cz';
  // private static apiUrl = 'http://kramerius.kfbz.cz';


  constructor(private http: HttpClient) {
  }

  private get(path: string, params = {}): Observable<Object> {
    return this.http.get(encodeURI(`${ApiService.apiUrl}${path}`), { params: params });
  }

  private put(path: string, body: any, options: any = {}): Observable<Object> {
    return this.http.put(encodeURI(`${ApiService.apiUrl}${path}`), body, options);
  }
  private post(path: string, body: any = null, options: any = {}): Observable<Object> {
    return this.http.post(encodeURI(`${ApiService.apiUrl}${path}`), body, options);
  }

  private delete(path: string, params = {}): Observable<Object> {
    return this.http.delete(encodeURI(`${ApiService.apiUrl}${path}`), { params: params });
  }

  // getAlbums(): Observable<any> {
  //   const path = '/search/api/v5.0/search?'
  //         + 'q=*:*&'
  //         // + 'fq=fedora.model:monograph'
  //         // + 'fq=fedora.model:sheetmusic'
  //         // + 'fq=fedora.model:map'
  //         // + 'fq=fedora.model:graphic'
  //         + 'fq=fedora.model:soundrecording'
  //         // + ' AND dostupnost:public'
  //         + '&'
  //         + 'fl=PID,dostupnost,dc.creator,keywords,dc.title,datum_str&'
  //         // + 'facet=true&'
  //         // + 'facet.mincount=1&'
  //         // + 'facet.field=keywords&'
  //         // + 'facet.field=facet_autor&'
  //         + 'rows=3000&'
  //         + 'start=0';
  //   return this.get(path);
  // }

  getPlaylists(): Observable<Playlist[]> {
    const path = `/playlists`
    return this.get(path).pipe(map((response: any)=> Playlist.fromJsonArray(response)));
  }

  getPlaylist(uid: string): Observable<Playlist> {
    const path = `/playlists/${uid}`
    return this.get(path).pipe(map((response: any)=> Playlist.fromJson(response)));
  }

  addTrackToPlaylist(playlist: Playlist, track: Track): Observable<any> {
    const path = `/playlists/${playlist.uid}/tracks/${track.pid}`
    return this.post(path);
  }

  createPlaylist(playlist: Playlist): Observable<Playlist> {
    const path = `/playlists`
    return this.post(path, { title: playlist.title }).pipe(map((response: any)=> Playlist.fromJson(response)));
  }

  getAlbums(): Observable<any> {
    const path = '/albums'
    return this.get(path);
  }

  getTracks(album: Album): Observable<any> {
    const path = `/albums/${album.pid}/tracks`
    return this.get(path);
  }

  getAlbumThumb(album: Album): string {
    return this.getThumb(album.source, album.pid);
  }

  getThumb(source: string, pid: string): string {
    return `${ApiService.sources[source]}/search/api/v5.0/item/${pid}/thumb`;
  }

  getMp3(track: Track): string {
    return `${ApiService.sources[track.source]}/search/api/v5.0/item/${track.pid}/streams/MP3`;
  }

  findTracks(query: string, onlyPublic: boolean = false, limit: number = 20): Observable<any> {
    const q = query.trim();
    let path = `/search/tracks?query=${q}`;
    if (onlyPublic) {
      path += '&accessibility=public';
    }
    path += `&limit=${limit}`;
    return this.get(path);
  }

  // getUnits(albumPids: string[]): Observable<any> {
  //   const path = '/search/api/v5.0/search?'
  //         + `q=PID:"${albumPids.join('" OR PID:"')}"&`
  //         + 'fl=PID,dostupnost,dc.title&'
  //         + 'rows=3000&'
  //         + 'start=0'
  //   return this.get(path);
  // }



}