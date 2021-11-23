import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service';


@Component({
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})

export class GenresComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {

  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

}
