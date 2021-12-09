import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='my-test-app';
  array = [];
  throttle = 50;
  splash = '';
  scrollDistance = 1;
  direction = "";
  movieDetail:any;
  modalOpen = false;
  page = 0;
  notFound = false;
  selectControl:FormControl;
  searchControl: FormControl;
  movies$: any = [];

  constructor(private DataService: DataService) {}

  ngOnInit() {
    setTimeout(() => {this.splash = 'hiddenbyId'} , 2000);
    this.searchControl = new FormControl();
    this.selectControl = new FormControl('all');
     this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()).subscribe(s => {
          this.trigerService(s.trim(),this.selectControl.value);
        });
      this.selectControl.valueChanges.subscribe(v => {
        this.trigerService(this.searchControl.value.trim(),v);
      });

  }
  
  trigerService(s,t){
    this.notFound = false;
    if(s){
      let initsubs = this.DataService.getMovieBySearchTerm(s, t).subscribe(res => {
        if(res['Search'] && res['Search'].length){
          this.movies$ = res['Search'];
        }else{
          this.movies$ = [];
          this.notFound =true;
        }
        this.page = 1;
        document.getElementById('infinity_scroll').scrollTop = 0;
        initsubs.unsubscribe();
      });
    }
    
  }

  onScrollDown() {
    this.page +=1;
    let scrollsubs = this.DataService.getMovieBySearchTermOnScroll(this.searchControl.value, this.selectControl.value, this.page).subscribe(res => {
       if(res['Search'] && res['Search'].length){
        this.movies$ = [...this.movies$, ...res['Search']];
       }
       scrollsubs.unsubscribe();
    });
  }

  onScroll() {
    console.log('scrolled!!');
  }

  toggleModal() {
    this.modalOpen = !this.modalOpen;
  }

  openDetail(movie){
    if(movie.imdbID){
      this.movieDetail = '';
      let detailsubs = this.DataService.getMovieDetail(movie.imdbID).subscribe(res => {
        if(res['Title']){
          this.movieDetail = res;
        }
        detailsubs.unsubscribe();
     });
     this.modalOpen = true;
    }
  }

  
}
