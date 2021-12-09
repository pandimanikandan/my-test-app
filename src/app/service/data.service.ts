import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getMovieBySearchTerm(query, type) {
    var url = type != 'all' ?  `https://www.omdbapi.com/?apikey=b9bd48a6&s=${query}&type=${type}&page=1`:
    `https://www.omdbapi.com/?apikey=b9bd48a6&s=${query}&page=1`;
    return this.http.get(url);
  }

  getMovieBySearchTermOnScroll(query, type, page) {
    var url = type != 'all' ?  `https://www.omdbapi.com/?apikey=b9bd48a6&s=${query}&type=${type}&page=${page}`:
    `https://www.omdbapi.com/?apikey=b9bd48a6&s=${query}&page=${page}`;
    return this.http.get(url);
  }
  getMovieDetail(id) {
    var url = `https://www.omdbapi.com/?apikey=b9bd48a6&i=${id}`
    return this.http.get(url);
  }
}
