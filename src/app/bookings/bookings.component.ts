import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MovieFormService } from '../movie-form.service';
import { MatTable } from '@angular/material/table';
import { IMovie, IMovieForm } from '../model';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MovieService } from '../movie.service';
import * as _moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { getMatIconNoHttpProviderError } from '@angular/material/icon';
import { concatMap, EMPTY, mergeMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  dataSource = []
  movie: IMovie;
  displayedColumns = ['movieName', 'date', 'time', 'seats', 'price', 'action']
  @ViewChild(MatTable) table: MatTable<IMovieForm>;
  constructor(private movieformService: MovieFormService,
    private _movieService: MovieService,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.movieformService.getBookings().subscribe(res => {
      this.dataSource = res.reverse()
    })


  }
  deletemovieByID(form: any) {
    // this._movieService.getMovie(form.movieId).pipe(mergeMap(val => {
    //   // console.log(val)
    //   return of(val)
    // })).subscribe((res) => { this.movie = res })
    // console.log(this.movie)
    this.dialog.open(DeletePopup, {
      data: { 'deletef': this.delete.bind(this, form) },
      width: '250px'
    })
  }
  delete(form) {
    const date = _moment(form.date).format('DD/MM/YYYY').toString();
    this._movieService.getMovie(form.movieId).subscribe((res) => {
      this.movie = res,
        console.log(this.movie.dates[date].slots[form.time])
      console.log(date)
      this.movie.dates[date].slots[form.time] += form.seats
      this._movieService.updateSeats(form.movieId, this.movie).subscribe()
    })




    this.movieformService.deleteMovieById(form.id).subscribe();
    const index = this.dataSource.findIndex((el) => el.id == form.id)
    this.dataSource.splice(index, 1);
    this.table.renderRows();

  }

  edit(id, form) {
    // console.log(form)
    this._movieService.getMovie(form.movieId).subscribe(res => {
      this.movie = res,
        this.router.navigate(['../movie-form' + '/' + id], { state: { data: this.movie } })
    })
    console.log(this.movie)



  }
  // getMovie(id) {
  //   this._movieService.getMovie(id)
  //     .subscribe(data => {
  //       this.movie = data;

  //     });
  //   console.log(this.movie)
  //   return this.movie
  // }

}


@Component({
  templateUrl: 'delete-popup.html',
})
export class DeletePopup {
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<DeletePopup>,
    private _snackBar: MatSnackBar,
    private movieformService: MovieFormService,
  ) { }

  delete() {
    this.data.deletef()
  }
}