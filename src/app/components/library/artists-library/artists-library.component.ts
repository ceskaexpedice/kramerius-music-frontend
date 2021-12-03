import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library-service';


@Component({
  templateUrl: './artists-library.component.html',
  styleUrls: ['./artists-library.component.scss']
})

export class ArtistsLibraryComponent implements OnInit {

  constructor(public library: LibraryService) { }

  ngOnInit() {

  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

}
