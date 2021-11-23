import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Album } from 'src/app/models/album.model';
import { Track } from 'src/app/models/track.model';
import { ApiService } from 'src/app/services/api-service';
import { Category, DataService } from 'src/app/services/data-service';
import { PlayerService } from 'src/app/services/player-service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  query: string;
  onlyPublic = false;

  albums: Album[];
  artists: Category[];
  genres: Category[];
  tracks: Track[];

  constructor(public data: DataService, private api: ApiService,
    private _sanitizer: DomSanitizer, private player: PlayerService
    ) { }

  ngOnInit() {
    this.query = this.data.lastSearchQuery;
    this.onlyPublic = this.data.lastSearchOnlyPublic;
    if (this.query) {
      this.onQueryChange(this.query);
    }
  }


  onPublicToggleChange() {
    console.log('only public', this.onlyPublic);
    this.onQueryChange(this.query);
  }

  onQueryChange(query: string) {
    this.data.lastSearchOnlyPublic = this.onlyPublic;
    this.data.lastSearchQuery = query;
    if (!query) {
      this.albums = [];
      this.artists = [];
      this.genres = [];
      this.tracks = [];
      console.log('AAA')
      return;
    }
    this.albums = this.data.getAlbumsByQuery(query, this.onlyPublic, 10);
    this.genres = this.data.getGenresByQuery(query, 10);
    this.artists = this.data.getArtistsByQuery(query);
    const q = query;
    this.data.findTracks(q, this.onlyPublic, (tracks: Track[]) => {
      if (q == this.query) {
        this.tracks = tracks;
      }
    });
  }

  thumb(album: Album): any {
    const url = this.api.getAlbumThumb(album);
    return this._sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

  albumCountText(count: number): string {
    if (count == 1) {
      return "1 album";
    } else if (count < 5) {
      return count + " alba";
    } else {
      return count + " alb";
    }
  }

  playAlbum(event: any, album: Album) {
    event.stopPropagation();
    event.preventDefault();
    this.data.getTracks(album, (tracks: Track[]) => {
      this.player.setTracks(tracks);
      this.player.playFirst();
    });
  }

  playTrack(event: any, track: Track) {
    event.stopPropagation();
    event.preventDefault();
    // this.data.getTracks(album, (tracks: Track[]) => {
      this.player.setTracks([track]);
      this.player.playFirst();
    // });
  }


}
