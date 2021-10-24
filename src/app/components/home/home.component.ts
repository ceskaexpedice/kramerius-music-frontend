import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data-service';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit() {

  }

  encode(value: string): string {
    return encodeURIComponent(value);
  }

}
