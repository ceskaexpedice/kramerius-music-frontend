import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  // private static apiUrl = 'https://kramerius.mzk.cz';
  private static apiUrl = 'https://kramerius.nm.cz';
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
  private post(path: string, body: any, options: any = {}): Observable<Object> {
    return this.http.post(encodeURI(`${ApiService.apiUrl}${path}`), body, options);
  }

  private delete(path: string, params = {}): Observable<Object> {
    return this.http.delete(encodeURI(`${ApiService.apiUrl}${path}`), { params: params });
  }

  getAlbums(): Observable<any> {
    const path = '/search/api/v5.0/search?'
          + 'q=*:*&'
          // + 'fq=fedora.model:monograph'
          // + 'fq=fedora.model:sheetmusic'
          // + 'fq=fedora.model:map'
          // + 'fq=fedora.model:graphic'
          + 'fq=fedora.model:soundrecording'
          // + ' AND dostupnost:public'
          + '&'
          + 'fl=PID,dostupnost,dc.creator,keywords,dc.title,datum_str&'
          // + 'facet=true&'
          // + 'facet.mincount=1&'
          // + 'facet.field=keywords&'
          // + 'facet.field=facet_autor&'
          + 'rows=3000&'
          + 'start=0';
    return this.get(path);
  }


  getTracks(albumPid: string): Observable<any> {
    const path = '/search/api/v5.0/search?'
          + `q=root_pid:"${albumPid}"&`
          + 'fq=fedora.model:track'
          + '&'
          + 'fl=PID,dostupnost,dc.title,model_path,pid_path,root_title,root_pid&'
          + 'rows=3000&'
          + 'start=0'
    return this.get(path);
  }

  findTracks(query: string, limit: number = 20): Observable<any> {
    const q = query.trim();
    const path = '/search/api/v5.0/search?'
          + `q=dc.title:${q}*&`
          + 'fq=fedora.model:track'
          + '&'
          + 'fl=PID,dostupnost,dc.title,model_path,pid_path,root_title,root_pid&'
          + `rows=${limit}&`
          + 'start=0'
    return this.get(path);
  }

  getUnits(albumPids: string[]): Observable<any> {
    const path = '/search/api/v5.0/search?'
          + `q=PID:"${albumPids.join('" OR PID:"')}"&`
          + 'fl=PID,dostupnost,dc.title&'
          + 'rows=3000&'
          + 'start=0'
    return this.get(path);
  }


  getThumb(pid: string): string {
    return `${ApiService.apiUrl}/search/api/v5.0/item/${pid}/thumb`;
  }

  getMp3(pid: string): string {
    return `${ApiService.apiUrl}/search/api/v5.0/item/${pid}/streams/MP3`;
  }

}