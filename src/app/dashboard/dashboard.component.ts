import { Component,OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cols=4;
  public movies:any[]=[];
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        this.cols=1
        return [
          { title: 'Card 1', cols: 1, rows: 2 },
          { title: 'Card 2', cols: 1, rows: 2 },
          { title: 'Card 3', cols: 1, rows: 2 },
          { title: 'Card 4', cols: 1, rows: 2 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 2 },
        { title: 'Card 2', cols: 1, rows: 2 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 2 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    private dialog:MatDialog,
    private _movieService:MovieService) {}

    ngOnInit(){
      this._movieService.getMovies()
      .subscribe(data=>this.movies=data);
    }

    openLogin(){
      this.dialog.open(LoginComponent)
    
    }
    
}

