import { Track } from "./track.model";

export class Playlist {

  name: string;
  description: string;
  tracks: Track[];

  constructor() {
    this.tracks = [];
  }

}
