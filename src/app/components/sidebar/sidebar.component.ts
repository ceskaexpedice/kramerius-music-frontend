import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlaylistService } from 'src/app/services/playlist-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  constructor(public auth: AuthService, public playlists: PlaylistService) { }

  ngOnInit() {

  }


  logout() {
    this.auth.logout(() => {
      //
    });
  }



}
