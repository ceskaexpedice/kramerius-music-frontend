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

  constructor(private api: ApiService, 
              public player: PlayerService, 
              private dialog: MatDialog,
              public data: DataService, 
              public playlists: PlaylistService,
              private route: ActivatedRoute) { }

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
    // console.log('initAlbum')
    this.album = album;
    this.data.getTracks(album, (tracks: Track[]) => {
      this.tracks = tracks;
      // console.log('tracks', tracks);
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
    return this.api.getAlbumThumb(this.album);
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

  enqueueAlbum() {
    this.player.enqueueTracks(this.tracks);
  }

  enqueueTrack(track: Track) {
    this.player.enqueueTracks([track]);
  }

  playAlbumNext() {
    this.player.putTracksNext(this.tracks);
  }

  playTrackNext(track: Track) {
    this.player.putTracksNext([track]);
  }

  playAlbumShuffled() {
    this.player.setTracks(this.tracks);
    this.player.shuffle();
    this.player.playFirst();
  }


  onAddToPlaylist(playlist: Playlist, track: Track) {
    this.api.addTrackToPlaylist(playlist, track).subscribe(() => {
      playlist.tracks.push(track);
    });
  }

  onAddToNewPlaylist(track: Track) {
    const data: SimpleDialogData = {
      title: "Zadejte název nového playlistu",
      message: "",
      textInput: {
        label: "Název",
        value: ""
      },
      btn1: {
        label: 'Vytvořit',
        value: 'create',
        color: 'primary'
      },
      btn2: {
        label: 'Zrušit',
        value: 'cancel',
        color: 'light'
      }
    };
    const dialogRef = this.dialog.open(SimpleDialogComponent, { data: data });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'create') {
        const value = data.textInput.value;
        if (value) {
          const p = new Playlist();
          p.title = value;
          this.api.createPlaylist(p).subscribe((playlist: Playlist) => {
            this.playlists.addPlaylist(playlist);
            this.api.addTrackToPlaylist(playlist, track).subscribe(() => {
              playlist.tracks.push(track);
            });
          });
        }
      }
    });
  }


}
