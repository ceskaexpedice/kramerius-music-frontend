
export class Track {

  pid: string;
  title: string;
  isPrivate: boolean;
  unitPid: string;
  unitTitle: string;

  constructor() {
  }

  static fromJson(json: any): Track {
    console.log('json', json);
    const track = new Track();
    track.pid = json['PID'];
    track.title = json['dc.title'];
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
