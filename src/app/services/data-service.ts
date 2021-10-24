import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';

@Injectable()
export class DataService {

  ready = false;
  albums: Album[];
  keywords: Category[];
  authors: Category[];

  constructor() {
  }

  init(input: any) {
    console.log('input', input);
    this.albums = Album.fromJsonArray(input['response']['docs']);
    console.log('albums', this.albums);

    // this.keywords = this.parseCategory(input, 'keywords');
    // this.authors = this.parseCategory(input, 'facet_autor');

    this.keywords = [];
    this.authors = [];
    const keywordMap: any = {};
    const authorsMap: any = {};
    for (const album of this.albums) {
      for (const author of album.authors) {
        if (authorsMap[author]) {
          authorsMap[author].count += 1;
        } else {
          const c: Category = {
            value: author,
            count: 1
          }
          this.authors.push(c);
          authorsMap[c.value] = c;
        }
      }
      for (const keyword of album.keywords) {
        if (keywordMap[keyword]) {
          keywordMap[keyword].count += 1;
        } else {
          const c: Category = {
            value: keyword,
            count: 1
          }
          this.keywords.push(c);
          keywordMap[c.value] = c;
        }
      }
    }
    this.keywords.sort((a,b) => {
      return b.count - a.count;
    });
    this.authors.sort((a,b) => {
      return b.count - a.count;
    });

    console.log('keywords', this.keywords);
    console.log('authors', this.authors);
    this.ready = true;
  }

  // private parseCategory(solr: any, category: string): Category[] {
  //   const categories: Category[] = [];
  //   const facetFields = solr['facet_counts']['facet_fields'][category];
  //   for (let i = 0; i < facetFields.length; i += 2) {
  //       const value = facetFields[i];
  //       if (!value) {
  //           continue;
  //       }
  //       const count = facetFields[i + 1];
  //       categories.push({
  //         value: value,
  //         count: count
  //       });
  //   }
  //   return categories;
  // }

  getAlbumsByCategory(category: string, value: string, limit: number = 10): Album[] {
    const albums: Album[] = [];
    for (const album of this.albums) {
      if (category == 'author' && album.authors.includes(value)) {
        albums.push(album);
      } else if (category == 'keyword' && album.keywords.includes(value)) {
        albums.push(album);
      }
      if (albums.length >= limit) {
        return albums;
      }
    }
    console.log('aaa', albums);
    return albums;
  }

  getTopKeywords(limit: number = 10) {
    const categories: Category[] = [];
    let i = 0;
    while (i < limit && i < this.keywords.length) {
      categories.push(this.keywords[i]);
      i++;
    }
    return categories;
  }

  getTopAuthors(limit: number = 10) {
    const categories: Category[] = [];
    let i = 0;
    while (i < limit && i < this.authors.length) {
      categories.push(this.authors[i]);
      i++;
    }
    return categories;
  }
  
}

interface Category {
    value: string;
    count: number;
    type?: string;
}