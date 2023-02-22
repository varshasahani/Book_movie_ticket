import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovieForm } from './model';
import { HttpClient } from '@angular/common/http'

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MovieFormService {
  private _url: string = "http://localhost:3000/users";
  private url: string = "http://localhost:3000/movie-form"
  constructor(private http: HttpClient,
    private userService: UserService) { }


  userId = this.userService.user.value.id


  getBookings(): Observable<IMovieForm[]> {
    return this.http.get<IMovieForm[]>(this._url + '/' + this.userId + '/' + 'movie-form')
  }

  deleteMovieById(id: any) {
    return this.http.delete(this.url + '/' + id);

  }

  getmovieForm(id: number) {
    return this.http.get(this.url + '/' + id)
  }

  editMovie(id: number, data: IMovieForm) {
    return this.http.put(this.url + '/' + id, data)
  }
}

