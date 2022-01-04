import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { Track } from 'src/app/models/track.model';
import { ApiService } from 'src/app/services/api-service';
import { PlayerService } from 'src/app/services/player-service';


@Component({
  templateUrl: './embed.component.html',
  styleUrls: ['./embed.component.scss']
})

export class EmbedComponent implements OnInit {

  ready = false;
  @ViewChild('progressContainer', { static: false }) progressContainer: any;


  constructor(private api: ApiService, public player: PlayerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pid = params.get('pid');
      console.log('pid', pid);
      this.api.getTrackForEmbed(pid).subscribe(response => {
        const track = Track.fromJson(response['track']);
        track.album = Album.fromJson(response['album']);
        console.log('track', track);
        this.player.setTracks([track]);
        this.player.loadFirst();
        this.ready = true;
      });
    });
  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

  onProgressClick(event: any) {
    const width = this.progressContainer.nativeElement.clientWidth;
    const point = event.clientX;
    const p = point / width;
    this.player.changeProgress(p);
  }




}
