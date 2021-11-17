import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/services/player-service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  isExpanded: boolean;

  @ViewChild('progressContainer', { static: false }) progressContainer: any;

  constructor(public player: PlayerService) { }

  ngOnInit() {
   this.isExpanded = false;
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

  togglePlayerPlaylist() {
    this.isExpanded = !this.isExpanded;
  }

}
