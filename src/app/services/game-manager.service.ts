import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardsService } from './cards.service';
import { TimerService } from './timer.service';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  private colorOfFirstTurnSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  public colorOfFirstTurn$: Observable<string> = this.colorOfFirstTurnSubject.asObservable();

  constructor(readonly cardsService: CardsService, readonly timerService: TimerService) { }

  // Determine Whose turn
  // Assign Cards their roles (red, blue, assassin, civilians)
  // Set display for remaining cards
  // Possible timer

  public setupInitialGame(): void {
    this.assignTeamThatGoesFirst();
  }

  private assignTeamThatGoesFirst(): void {
    const randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber % 2) {
      this.colorOfFirstTurnSubject.next('red');
      this.cardsService.updateNumberOfRedCards();

    } else {
      this.colorOfFirstTurnSubject.next('blue');
      this.cardsService.updateNumberOfBlueCards();

    }
  }

  // private startCountdown(seconds): void {
  //   let counter = seconds;
  //   const interval = setInterval(() => {
  //   console.log(counter);
  //   counter--;
  //   if (counter === 0) {
  //     clearInterval(interval);
  //     console.log("I'm done!");
  //     return;
  //   }
  //   }, 1000);
  // }
}
