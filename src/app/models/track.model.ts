import { Album } from "./album.model";
import { Unit } from "./unit.model";

export class Track {

  pid: string;
  title: string;
  isPrivate: boolean;
  source: string;
  albumPid: string;
  album: Album;
  unit: string;


  // unitPid: string;
  // unit: Unit;


  constructor() {
  }

  static fromJson(json: any): Track {
    const track = new Track();
    track.pid = json['pid'];
    track.title = json['title'];
    track.unit = json['unit'];
    track.isPrivate = json['is_private'];
    track.albumPid = json['album_pid'];
    track.source = json['source'];
    return track;
  }

  static fromJsonArray(json: any): Track[] {
    const result = [];
    for (const obj of json) {
      result.push(Track.fromJson(obj));
    }
    return result;
  }

}
