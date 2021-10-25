import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { DataService } from 'src/app/services/data-service';


@Component({
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})

export class AlbumComponent implements OnInit, OnDestroy {

  pid: string;
  album: Album;
  private dataStatusSubscription: Subscription;

  constructor(public data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.pid = params.get('pid') || "";
      if (this.data.ready) {
        this.album = this.data.getAlbumByPid(this.pid);
      }
      this.dataStatusSubscription = this.data.watchStatus().subscribe(() => {
        this.album = this.data.getAlbumByPid(this.pid)
      });
      console.log('aaaa', this.data.getAlbumsByCategory('artist', this.album.artist(), 10));
    });
  }

  ngOnDestroy(): void {
    this.dataStatusSubscription.unsubscribe();
  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

}
