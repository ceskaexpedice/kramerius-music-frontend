import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service';
import { DataService } from 'src/app/services/data-service';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private api: ApiService, public data: DataService) { }

  ngOnInit() {
    this.api.getAlbums().subscribe((result) => {
      this.data.init(result);
    })
  }

}
