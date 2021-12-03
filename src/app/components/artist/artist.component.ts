import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
import { LibraryService } from 'src/app/services/library-service';


@Component({
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})

export class ArtistComponent implements OnInit {

  artist: string;

  constructor(public data: DataService, 
    public library: LibraryService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.artist = decodeURIComponent(params.get('artist') || '');
      console.log('artist', this.artist);

    });
  }

  albumCountText(count: number): string {
    if (count == 1) {
      return "1 album";
    } else if (count < 5) {
      return count + " alba";
    } else {
      return count + " alb";
    }
  }


}
