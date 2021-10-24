
export class Album {

  pid: string;
  title: string;
  authors: string[];
  keywords: string[];
  isPrivate: boolean;
  date: string;

  constructor() {
  }


  author(): string {
    if (this.authors.length > 0) {
      return this.authors[0];
    }
    return "";
  }



  static fromJson(json: any): Album {
    const album = new Album();
    album.pid = json['PID'];
    album.title = json['dc.title'];
    album.authors = json['dc.creator'] || [];
    album.keywords = json['keywords'] || [];
    album.isPrivate = json['dostupnost'] == 'private';
    album.date = json['datum_str'];
    return album;
  }

  static fromJsonArray(json: any): Album[] {
    const result = [];
    for (const obj of json) {
      result.push(Album.fromJson(obj));
    }
    return result;
  }

}
