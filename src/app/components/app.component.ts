import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(public player: PlayerService) { }

  ngOnInit() {
  }
}
