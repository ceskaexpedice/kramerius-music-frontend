import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PlayerService } from '../services/player-service';
declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  embed = true;

  constructor(public player: PlayerService, 
    private router: Router) { 
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-41TKB96TQX', {'page_path': event.urlAfterRedirects });
        this.embed = event.url.startsWith('/embed/');
      }
    });
  }

}
