import { Component,OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { MovieService } from '../movie.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cols=4;
  public movies:any[]=[];
  apiResponse:any=[];
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
    private dialog:MatDialog,
    private _movieService:MovieService) {}

    ngOnInit(){
      
      this._movieService.getMovies()
      .subscribe(data=>{
        this.movies=data;
        this.apiResponse=data;
      });
    }

    openLogin(){
      this.dialog.open(LoginComponent)
    
    }

    // onSelect(langauge){
    //   this._movieService.getMovies().pipe(
    //     filter((item)=>item.langauge == langauge))
    //     .subscribe(data=>this.movies=data);
      
    // }

    onChange($event:any){

      let filterData=_.filter(this.apiResponse,(item)=>{
        return item.langauge.toLowerCase()==$event.value.toLowerCase();
      })
      this.movies=filterData;
      
    }
    
}

