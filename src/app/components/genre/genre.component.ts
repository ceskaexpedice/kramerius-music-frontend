import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data-service';


@Component({
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})

export class GenreComponent implements OnInit {

  genre: string;

  constructor(public data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.genre = decodeURIComponent(params.get('genre') || '');
      console.log('genre', this.genre);
    });
  }

}
