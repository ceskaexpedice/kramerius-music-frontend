import { Album } from "./album.model";
import { Unit } from "./unit.model";

export class Track {

  pid: string;
  title: string;
  isPrivate: boolean;
  unitPid: string;
  unit: Unit;
  albumPid: string;
  album: Album;

  constructor() {
  }

  static fromJson(json: any): Track {
    console.log('json', json);
    const track = new Track();
    track.pid = json['PID'];
    track.title = json['dc.title'];
    track.albumPid = json['root_pid'];
    track.isPrivate = json['dostupnost'] == 'private';
    const models = json['model_path'][0].split('/');
    const pids = json['pid_path'][0].split('/');
    if (models.length >= 2 && models[models.length - 2] == 'soundunit' && pids.length >= 2) {
      track.unitPid = pids[pids.length - 2];
    }
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
