import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() image: string;
  @Input() name: string;
  @Input() size: number = 40;

  constructor() { }

  ngOnInit() {
  }

  getTextProfileImage(): string {
    if (!this.name) {
        return '?';
    }
    return this.name[0];
  }

}
