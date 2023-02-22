import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MovieService } from '../../movie.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common'
import * as _moment from 'moment';
import { LoginComponent } from '../../login/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { IMovie, IMovieForm } from 'src/app/model';
import { UserService } from 'src/app/user.service';
import { of, switchMap, EMPTY, take, first } from 'rxjs';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MovieFormService } from 'src/app/movie-form.service';



@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
  public movieId;
  public movie: IMovie;
  public movies;
  minDate: Date;
  maxDate: Date;
  maxSeats;
  events: string[] = [];
  slots: string[] = [];
  seatObj;
  formDate;
  public movieForm !: FormGroup;
  price;
  name;
  time;
  editData: IMovieForm;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _movieService: MovieService,
    public datepipe: DatePipe,
    private http: HttpClient,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private _movieFormervice: MovieFormService

    // @Inject(MAT_DIALOG_DATA) public data
  ) {
    const currentDate = new Date()

    this.minDate = new Date(currentDate);
    // const ts=new Date().toDateString();
    // this.maxDate = new Date(ts+7);
    this.movie = this.router.getCurrentNavigation().extras.state['data']
    console.log(this.router.getCurrentNavigation().extras)
    localStorage.setItem('movie', JSON.stringify(this.movie))

  }

  ngOnInit(): void {

    // this._movieService.getMovies()
    //   .subscribe(data => {
    //     this.movies = data;
    //   });


    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.getmovieForm(id);
    })



    // this.route.queryParams.subscribe((params: any) => {
    //   console.log(params)
    //   // let id = parseInt(params.get('id'));
    //   this.movie = params.data
    // console.log(this.movie)
    // this.movie=this.getMovieById(id)
    // this.getMovie(id);
    // let movie=this._movieService.getMovie(this.movieId);
    // this.movie=movie;
    // });

    // this._movieService.getMovie(this.movieId)
    //   .subscribe(data => {
    //     this.movie = data;

    //   });



    this.movieForm = this.formBuilder.group({
      userId: [''],
      movieId: [''],
      movieName: [''],
      date: ['', Validators.required],
      time: [{ value: '', disabled: true }, Validators.required],
      seats: [{ value: 0, disabled: true }, Validators.required],
      price: [{ value: 0, disabled: true }, Validators.min(1)]
    })


  }

  private getmovieForm(id: number) {
    if (id == 0) {
      this.movieForm = this.formBuilder.group({
        userId: [''],
        movieId: [''],
        movieName: [''],
        date: ['', Validators.required],
        time: [{ value: '', disabled: true }, Validators.required],
        seats: [{ value: 0, disabled: true }, Validators.required],
        price: [{ value: 0, disabled: true }, Validators.min(1)]
      })
    }
    else {



      this._movieFormervice.getmovieForm(id).pipe(first()).subscribe((res: any) => {
        this.editData = res
        this.movieForm.patchValue({
          id: this.editData.id,
          userId: this.editData.userId,
          movieId: this.editData.movieId,
          date: this.editData.date,
          time: this.editData.time,
          seats: this.editData.seats,
          price: this.editData.price
        })
        // const time = editData['time'].value.toString()
        // this.movieForm = this.formBuilder.group({
        //   userId: [editData['userId']],
        //   movieId: [editData['movieId']],
        //   movieName: [editData['movieName']],
        //   date: [editData['date'], Validators.required],
        //   time: [{ value: time, disabled: true }, Validators.required],
        //   seats: [{ value: editData['seats'], disabled: true }, Validators.required],
        //   price: [{ value: editData['price'], disabled: true }, Validators.min(1)]
        // })
        // this.movieForm = this.formBuilder.group({
        // this.movieForm.controls['userId'].setValue(editData['id'])
        // this.movieForm.controls['userId'].setValue(editData['userId'])
        // this.movieForm.controls['movieId'].setValue(editData['movieId'])
        // this.movieForm.controls['movieName'].setValue(editData['movieName'])
        // this.movieForm.controls['date'].setValue(editData['date'])
        // this.movieForm.controls['time'].setValue(editData['time'])
        // this.movieForm.controls['seats'].setValue(editData['seats'])
        // this.movieForm.controls['price'].setValue(editData['price'])
      })
      // })
    }
  }

  addEvent(movie, event: MatDatepickerInputEvent<Date>) {
    this.movieForm.controls['seats'].reset()
    this.movieForm.controls['time'].enable()
    this.movieForm.controls['time'].reset()
    this.movieForm.controls['price'].disable()
    this.movieForm.controls['seats'].disable()
    this.movieForm.controls['price'].setValue(0)
    this.maxSeats = -1
    this.formDate = _moment(event.value).format('DD/MM/YYYY').toString();
    const shows = movie.dates[this.formDate];
    this.slots = [];
    this.slots = Object.keys(shows.slots)
    // let slots = _.filter(shows, (value, key) => {
    //   console.log(key)
    //   return key == e;
    // })

    // for (var key in shows) {
    //   if (key === e) {
    //     this.slots = shows[key]
    //   }
    // }

  }

  openLogin() {
    this.dialog.open(LoginComponent)
  }

  getMovieById(id: any) {
    // this._movieService.getMovie(id)
    // .subscribe(data=>{
    //   this.movie=data;console.log(this.movie)
    // });

    return this.movie
  }


  onChange($event) {
    this.movieForm.controls['price'].enable()
    this.price = $event.target.value * 100
    this.movieForm.get('price').setValue(this.price)


  }

  submit() {

    this.userService.user.pipe(take(1)).subscribe(user => {
      if (!user) {
        this.dialog.open(LoginComponent)
        this._snackBar.open("Please Login first", 'Close', {
          horizontalPosition: "center",
          verticalPosition: "top"
        });
      }
      else {

        this.movieForm.get('movieName').setValue(this.movie.name)
        this.movieForm.get('movieId').setValue(this.movie.id)
        console.log(this.price)
        this.movieForm.get('price').setValue(this.price)
        this.movieForm.get('userId').setValue(this.userService.user.value.id)
        if (this.editData.id != null) {
          this.movie.dates[this.formDate].slots[this.time.value] += this.editData.seats
          this._movieService.updateSeats(this.movie.id, this.movie).subscribe()
        }

        this.movie.dates[this.formDate].slots[this.time.value] -= this.movieForm.get('seats').value
        this._movieService.updateSeats(this.movie.id, this.movie).subscribe()

        this.dialog.open(PaymentPopup, {
          data: { price: this.price, movieForm: this.movieForm, editData: this.editData },
          width: '250px'
        })
      }
    })



  }


  // (user=>{
  //   if(user){
  //     this.http.post<any>("http://localhost:3000/movie-form",this.movieForm.value)
  //     .subscribe(res => {
  //       alert("booked successfull");
  //   });
  //   }
  //   else{
  //     this.dialog.open(LoginComponent)
  //   }
  // })




  seats($event) {

    this.movieForm.controls['seats'].reset()
    this.movieForm.controls['price'].disable()
    this.movieForm.controls['seats'].enable()
    this.movieForm.controls['price'].setValue(0)
    console.log($event, this.movieForm.value)
    const shows = this.movie.dates[this.formDate].slots
    this.time = $event
    this.maxSeats = shows[$event.value]
    if (this.maxSeats <= 0) {
      this.movieForm.controls['seats'].disable()
    }
  }
}





@Component({
  templateUrl: 'payment-popup.html',
})
export class PaymentPopup {
  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<PaymentPopup>,
    private _snackBar: MatSnackBar,
    private router: Router,
    private http: HttpClient,
    private _moviFormervice: MovieFormService) { }

  payment() {

    const editId = this.data.editData.id
    // this.movieForm.get('movieName').setValue(this.movie.name)
    console.log(this.data.movieForm)
    if (editId != '' && editId != null) {
      this.data.movieForm.id = this.data.editData.id
      console.log(this.data.editData)

      this._moviFormervice.editMovie(editId, this.data.movieForm.value).subscribe()
      // this._snackBar.open("Update Successfully!", 'Close', {
      //   horizontalPosition: "center",
      //   verticalPosition: "top"
      // })

    }
    else {
      this.http.post<any>("http://localhost:3000/movie-form", this.data.movieForm.value).subscribe(res => {
        this._snackBar.open("Booked Successfully!", 'Close', {
          horizontalPosition: "center",
          verticalPosition: "top"
        })
        this.data.movieForm.reset()
        this.router.navigate(['myBookings'])

      })

    }
  }
}