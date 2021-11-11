import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Track } from 'src/app/models/track.model';
import { ApiService } from 'src/app/services/api-service';
import { DataService } from 'src/app/services/data-service';
import { PlayerService } from 'src/app/services/player-service';


@Component({
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})

export class AlbumComponent implements OnInit, OnDestroy {

  pid: string;
  album: Album;
  tracks: Track[];

  albumsByArtist: Album[];
  albumsByGenre: Album[];

  private dataStatusSubscription: Subscription;

  constructor(private api: ApiService, public player: PlayerService, public data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pid = params.get('pid') || "";
      if (this.data.ready) {
        this.initAlbum(this.data.getAlbumByPid(this.pid));
      }
      this.dataStatusSubscription = this.data.watchStatus().subscribe(() => {
        this.initAlbum(this.data.getAlbumByPid(this.pid));
      });
    });
  }


  initAlbum(album: Album) {
    this.album = album;
    this.data.getTracks(album, (tracks: Track[]) => {
      this.tracks = tracks;
    });
    this.albumsByArtist = [];
    this.albumsByGenre = [];
    for (const album of this.data.getAlbumsByCategory('genre', this.album.genre(), 10)) {
      if (this.album.pid != album.pid) {
        this.albumsByGenre.push(album);
      }
    }
    for (const album of this.data.getAlbumsByCategory('artist', this.album.artist(), 10)) {
      if (this.album.pid != album.pid) {
        this.albumsByArtist.push(album);
      }
    }

  }

  ngOnDestroy(): void {
    this.dataStatusSubscription.unsubscribe();
  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

  getImage(): string {
    return this.api.getThumb(this.album.pid);
  }

  playTrack(track: Track) {
    if (this.player.isActive(track)) {
      if (this.player.playing) {
        this.player.pause();
      } else {
        this.player.play();
      }
    } else {
      this.player.setTracks(this.tracks);
      this.player.playTrack(track);
    }
  }

  playAlbum() {
    this.player.setTracks(this.tracks);
    this.player.playFirst();
  }

}
