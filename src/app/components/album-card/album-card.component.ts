import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Album } from 'src/app/models/album.model';
import { ApiService } from 'src/app/services/api-service';
import { DataService } from 'src/app/services/data-service';


@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss']
})

export class AlbumCardComponent implements OnInit {

  @Input() album: Album;

  constructor(private api: ApiService, 
    public data: DataService,
    private _sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
  }

  thumb():any {
    const url = this.api.getThumb(this.album.pid);
    return this._sanitizer.bypassSecurityTrustStyle(`url(${url})`);

  }

  log() {
    console.log(this.album);
  }

}
