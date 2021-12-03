import { Component, OnInit } from '@angular/core';
import { LibraryService } from 'src/app/services/library-service';


@Component({
  templateUrl: './albums-library.component.html',
  styleUrls: ['./albums-library.component.scss']
})

export class AlbumsLibraryComponent implements OnInit {

  constructor(public library: LibraryService) { }

  ngOnInit() {
   
  }

}
