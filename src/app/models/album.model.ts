
export class Album {

  pid: string;
  title: string;
  artists: string[];
  genres: string[];
  isPrivate: boolean;
  date: string;
  source: string;

  constructor() {
  }


  artist(): string {
    if (this.artists.length > 0) {
      return this.artists[0];
    }
    return "";
  }

  genre(): string {
    if (this.genres.length > 0) {
      return this.genres[0];
    }
    return "";
  }

  encodedArtist(): string {
    return encodeURIComponent(this.artist());
  }

  static fromJson(json: any): Album {
    const album = new Album();
    album.pid = json['pid'];
    album.title = json['title'];
    album.artists = json['artists'] || [];
    album.genres = json['genres'] || [];
    album.isPrivate = json['is_private']
    album.date = json['date'];
    album.source = json['source'];
    return album;
  }

  static fromJsonArray(json: any): Album[] {
    const result = [];
    for (const obj of json) {
      result.push(Album.fromJson(obj));
    }
    return result;
  }


  sourceName(): string {
    if (this.source == 'mzk') {
      return "Moravská zemská knihovna v Brně";
    } else if (this.source == 'kfbz') {
      return "Krajská knihovna Františka Bartoše ve Zlíně";
    } else if (this.source == 'mlp') {
      return "Městská knihovna v Praze";
    } else if (this.source == 'nm') {
      return "Národní muzeum";
    } 
    return "";
  }



}
