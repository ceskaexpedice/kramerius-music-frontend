export class Unit {

  pid: string;
  title: string;
  isPrivate: boolean;  

  constructor() {
  }

  static fromJson(json: any): Unit {
    const unit = new Unit();
    unit.pid = json['PID'];
    unit.title = json['dc.title'];
    unit.isPrivate = json['dostupnost'] == 'private';
    return unit;
  }

  static fromJsonArray(json: any): Unit[] {
    const result = [];
    for (const obj of json) {
      result.push(Unit.fromJson(obj));
    }
    return result;
  }

}
