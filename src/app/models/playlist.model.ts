import { Track } from "./track.model";

export class Playlist {

  uid: string;
  title: string;
  tracks: Track[];

  constructor() {
    this.tracks = [];
  }

  static fromJson(json: any): Playlist {
    const playlist = new Playlist();
    playlist.uid = json['uid'];
    playlist.title = json['title'];
    if (json['tracks']) {
      playlist.tracks = Track.fromJsonArray(json['tracks']);
    } else {
      playlist.tracks = [];
    }
    return playlist;
  }

  static fromJsonArray(json: any): Playlist[] {
    const result = [];
    for (const obj of json) {
      result.push(Playlist.fromJson(obj));
    }
    return result;
  }


}
