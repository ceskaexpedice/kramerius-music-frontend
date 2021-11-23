import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service';


@Component({
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})

export class ArtistsComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {

  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

}
