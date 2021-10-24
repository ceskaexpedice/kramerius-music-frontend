
export class Album {

  pid: string;
  title: string;
  artists: string[];
  genres: string[];
  isPrivate: boolean;
  date: string;

  constructor() {
  }


  artist(): string {
    if (this.artists.length > 0) {
      return this.artists[0];
    }
    return "";
  }

  encodedArtist(): string {
    return encodeURIComponent(this.artist());
  }

  static fromJson(json: any): Album {
    const album = new Album();
    album.pid = json['PID'];
    album.title = json['dc.title'];
    album.artists = json['dc.creator'] || [];
    album.genres = json['keywords'] || [];
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
