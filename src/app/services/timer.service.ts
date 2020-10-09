import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timeLimit$: BehaviorSubject<number> = new BehaviorSubject(90);
  private minutes$: BehaviorSubject<number> = new BehaviorSubject(1);
  private seconds$: BehaviorSubject<number> = new BehaviorSubject(60);
  private timerForMinutes$: Observable<number> = timer(0, 60000);
  private timerForSeconds$: Observable<number> = timer(0, 1000);

  public playClockWithMinutesAndSeconds$ = combineLatest([
    this.minutes$,
    this.seconds$,
    this.timerForMinutes$,
    this.timerForSeconds$,
  ]).pipe(
    map(([minutes, seconds, minutesTimer, secondsTimer]) => {
      return {
        minutes,
        seconds,
        minutesTimer,
        secondsTimer
      };
    }),
    map(x => {
      x.seconds = x.seconds - x.secondsTimer - 1;
      x.minutes = x.minutes - x.minutesTimer - 1;
      return x;
    }),
    takeWhile(x => x.seconds >= 0),
    tap(data => console.log(`data`, data))
  );



  // public timer$: Observable<number> = timer(1000, 1000).pipe(
  //   map(x => (this.timeLimit - x - 1)),
  //   take(this.timeLimit),
  //   tap(x => {
  //     if (x === 0) {
  //       console.log(`Turn Over`);
  //     }
  //   })
  // );

  constructor() { }


}
