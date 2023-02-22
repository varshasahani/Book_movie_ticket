import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router,ParamMap} from '@angular/router';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {
 public movieId;
  constructor(private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id=parseInt(params.get('id'));
      this.movieId=id;
    });
  }

}
