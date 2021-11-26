import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SimpleDialogData } from 'src/app/dialogs/simple-dialog/simple-dialog';
import { SimpleDialogComponent } from 'src/app/dialogs/simple-dialog/simple-dialog.component';
import { Album } from 'src/app/models/album.model';
import { Playlist } from 'src/app/models/playlist.model';
import { Track } from 'src/app/models/track.model';
import { ApiService } from 'src/app/services/api-service';
import { DataService } from 'src/app/services/data-service';
import { PlayerService } from 'src/app/services/player-service';
import { PlaylistService } from 'src/app/services/playlist-service';


@Component({
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})

export class PlaylistComponent implements OnInit, OnDestroy {

  uid: string;
  playlist: Playlist;

  private dataStatusSubscription: Subscription;


  constructor(private api: ApiService, 
              public player: PlayerService, 
              private dialog: MatDialog,
              public data: DataService, 
              public playlists: PlaylistService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.uid = params.get('uid') || "";
        this.api.getPlaylist(this.uid).subscribe((playlist: Playlist)=> {
          this.playlist = playlist;
          if (this.data.ready) {
            this.initPlaylist();
          }
          this.dataStatusSubscription = this.data.watchStatus().subscribe(() => {
            this.initPlaylist();
          });
        })
    });
  }

  playPlaylist() {
    this.player.setTracks(this.playlist.tracks);
    this.player.playFirst();
  }

  playTrack(track: Track) {
    if (this.player.isActive(track)) {
      if (this.player.playing) {
        this.player.pause();
      } else {
        this.player.play();
      }
    } else {
      this.player.setTracks(this.playlist.tracks);
      this.player.playTrack(track);
    }
  }

  initPlaylist() {
    for (const track of this.playlist.tracks) {
      track.album = this.data.getAlbumByPid(track.albumPid);
    }
  }

  ngOnDestroy(): void {
    this.dataStatusSubscription.unsubscribe();
  }

  trackCountText(): string {
    const count = this.playlist.tracks.length;
    if (count == 1) {
      return "1 skladba";
    } else if (count < 5) {
      return count + " skladby";
    } else {
      return count + " skladeb";
    }
  }

}
