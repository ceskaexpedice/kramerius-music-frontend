import { Component, OnInit } from '@angular/core';
import { AngularTokenService } from 'angular-token';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data-service';
import { PlaylistService } from 'src/app/services/playlist-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  constructor(public auth: AuthService, 
    private tokenService: AngularTokenService,
    private data: DataService,
    public playlists: PlaylistService) { }

  ngOnInit() {
    this.tokenService.validateToken().subscribe(
      () => {
        this.auth.afterLogin();
    });
    this.data.init();
  }

  logout() {
    this.auth.logout(() => {
      //
    });
  }



}
