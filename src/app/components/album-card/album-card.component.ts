import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Album } from 'src/app/models/album.model';
import { Track } from 'src/app/models/track.model';
import { ApiService } from 'src/app/services/api-service';
import { DataService } from 'src/app/services/data-service';
import { PlayerService } from 'src/app/services/player-service';


@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})

export class AlbumCardComponent implements OnInit {

  @Input() album: Album;

  constructor(private api: ApiService, 
    public data: DataService,
    private player: PlayerService,
    private _sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
  }

  thumb():any {
    const url = this.api.getAlbumThumb(this.album);
    // const url = `/assets/img/img${Math.ceil(Math.random() * 6)}.png`;
    return this._sanitizer.bypassSecurityTrustStyle(`url(${url})`);

  }

  playAlbum(event: any, album: Album) {
    event.stopPropagation();
    event.preventDefault();
    this.data.getTracks(album, (tracks: Track[]) => {
      this.player.setTracks(tracks);
      this.player.playFirst();
    });
  }
}
