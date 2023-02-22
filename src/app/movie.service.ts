import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IMovie, IUser } from './model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private _url: string = "http://localhost:3000/movies";
  public movies;
  public movie;
  constructor(private http: HttpClient) { }

  getMovies(): Observable<IMovie[]> {
    this.movies = this.http.get<IMovie[]>(this._url);
    return this.movies
  }

  getMovie(id: any): Observable<IMovie> {
    return this.http.get<IMovie>(this._url + '/' + id);

  }

  updateSeats(id: any, data: IMovie) {
    return this.http.put(this._url + '/' + id, data)
  }



  // getMovie(id:any){
  //   console.log(id)
  //   let movie=this.movies.find(movie=>movie.id==id)
  //   console.log(movie);
  //   return movie
  //   console.log(movie);
  // }
}
