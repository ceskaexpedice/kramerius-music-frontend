import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { AuthService } from '../services/auth.service';
import { PlayerService } from '../services/player-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(public player: PlayerService, private auth: AuthService, private tokenService: AngularTokenService) { }

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      () => {
        this.auth.afterLogin();
      })
  }

}
