import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { AuthService } from '../services/auth.service';
import { PlayerService } from '../services/player-service';
declare var gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(public player: PlayerService, 
    private auth: AuthService, 
    private router: Router,
    private tokenService: AngularTokenService) { 

      this.router.events.forEach(item => {
        if (item instanceof NavigationEnd) {
          gtag('config', 'G-41TKB96TQX', {'page_path': item.urlAfterRedirects });
        }
      });
  
    }
    
  ngOnInit() {

    this.tokenService.validateToken().subscribe(
      () => {
        this.auth.afterLogin();
      })
  }

}
