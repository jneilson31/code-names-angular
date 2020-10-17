import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  // private timeLimit$: BehaviorSubject<number> = new BehaviorSubject(90);
  // private minutes$: BehaviorSubject<number> = new BehaviorSubject(1);
  private seconds$: BehaviorSubject<number> = new BehaviorSubject(90);
  // private timerForMinutes$: Observable<number> = timer(0, 60000);
  private timerForSeconds$: Observable<number> = timer(0, 1000);

  public timer$ = combineLatest([
    this.seconds$,
    this.timerForSeconds$,
  ]).pipe(
    map(([seconds, secondsTimer]) => {
      return {
        seconds,
        secondsTimer
      };
    }),
    map(x => {
      x.seconds = x.seconds - x.secondsTimer - 1;
      return x.seconds;
    }),
    takeWhile(x => x >= 0)
  );

  constructor() { }


}
