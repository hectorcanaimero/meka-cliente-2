import { Component, EventEmitter, Input, Output, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/app.state';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-stars-widget',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements AfterViewInit {

  @Input() type = true;
  @Input() score = 0;
  @Output() value = new EventEmitter();
  score$!: Observable<number|any>;
  data: any[] = [];
  scoreFinal = 0;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngAfterViewInit(): void {
    // this.getScore();
    this.getData();
  }

  getData() {
    this.createArray(this.score);
  }

  createArray = (num: number = 4) => {
    const numero = num.toString().split('.');
    this.valueEntero(numero[0]);
    this.valueDecimal(numero[1]);
    this.valueFinal(numero[0]);
  };

  getClick = (item: number) => {
    this.data = [];
    const value = 1 + item;
    this.valueEntero(value.toString());
    this.valueFinal(value.toString());
    this.value.emit(value);
  };

  getScore = () => {
    this.score$ = this.store.select('rating')
    .pipe(
      filter(row => !row.loading),
      map((res: any) => res.total !== null ? res.total: 0),
      map((res: number) => res.toFixed(2))
    );
    this.score$.subscribe((res) => this.createArray(res));
  };

  private valueEntero = (entero: string) => {
    if (+entero > 0) {
      for (let index = 1; index <= +entero; index++) {
        this.data.push('star');
      }
    }
  };
  private valueDecimal = (decimal: string) => {
    let star;
    const value = +decimal;
    if (value > 0) {
      if (value > 3 && value < 7){
        star = 'star-half';
      }
      else if (value < 3) {
        star = 'star-outline';
      } else {
        star = 'star';
      }
      this.data.push(star);
    }
  };

  private valueFinal = (entero: string) => {
    const value = 5 - (+entero);
    for (let index = 1; index <= value; index++) {
      this.data.push('star-outline');
    }
  };
}
