import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, timer } from 'rxjs';
import { map, takeWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timeLimit$: BehaviorSubject<number> = new BehaviorSubject(90);
  private minutes$: BehaviorSubject<number> = new BehaviorSubject(1);
  private seconds$: BehaviorSubject<number> = new BehaviorSubject(5);
  private timerForTimeRemaining$: Observable<any> = timer(0, 1000);
  private timerForMinutes$: Observable<number> = timer(0, 1000);
  private timerForSeconds$: Observable<number> = timer(0, 1000);

  public playClock$ = combineLatest([
    this.timeLimit$,
    this.timerForTimeRemaining$
  ]).pipe(
    map(([timeLimit, countdownTimer]) => {
      return {
        timeLimit,
        countdownTimer
      };
    }),
    map(x => (x.timeLimit - x.countdownTimer - 1)),
    takeWhile(timeRemaining => timeRemaining > 0),
    tap(data => console.log(`data`, data))
  );

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
    tap(data => console.log(`data from combineLatest`, data)),
    map(x => x.minutes),
    // takeWhile(timeRemaining => timeRemaining > 0),
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
