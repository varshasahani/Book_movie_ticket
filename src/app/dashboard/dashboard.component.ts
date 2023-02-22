import { Component, OnInit, Input } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MovieService } from '../movie.service';
import * as _ from 'lodash';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { IMovie } from '../model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cols = 4;
  rowHeight = "3:4";
  public movies;
  public selectedId;

  apiResponse: any = [];
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       this.cols=1
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 2 },
  //         { title: 'Card 2', cols: 1, rows: 2 },
  //         { title: 'Card 3', cols: 1, rows: 2 },
  //         { title: 'Card 4', cols: 1, rows: 2 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 1, rows: 2 },
  //       { title: 'Card 2', cols: 1, rows: 2 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 2 }
  //     ];
  //   })
  // );

  constructor(private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private _movieService: MovieService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {
          this.cols = 1;
        }
      });

    this.breakpointObserver.observe(Breakpoints.Web)
      .subscribe(result => {

        if (result.matches) {
          this.cols = 4;
        }
      });

    this._movieService.getMovies()
      .subscribe(data => {
        this.movies = data;
        this.apiResponse = data;
      });

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   let id = parseInt(params.get('id'));
    //   this.selectedId = id;
    // });
  }
  // openLogin(){
  //   this.dialog.open(LoginComponent)

  // }

  // openForm(data){
  //   this.dialog.open(MovieFormComponent,
  //     {data:data})
  //  }


  onChange($event) {
    this.movies = this.apiResponse;
    let filterData = _.filter(this.apiResponse, (item) => {
      return item.langauge.toLowerCase() == $event.value.toLowerCase();
    })
    if (filterData.length > 0) {
      this.movies = filterData;
    }

  }

  onSelect(movie: IMovie) {
    this.router.navigate(['/movie-form/0'], { state: { data: movie } });

  }

  isSelected(movie) {
    return movie.id === this.selectedId;
  }

}

