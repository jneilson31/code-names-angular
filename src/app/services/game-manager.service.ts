import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardsService, CardValues } from './cards.service';
import { TimerService } from './timer.service';

export enum whoseTurn {
  RedAgent = 'red',
  BlueAgent = 'blue',
}

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  private whoseTurnSubject: BehaviorSubject<whoseTurn> = new BehaviorSubject(null);
  private assassinCardClicked$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public assassinCardClicked$: Observable<boolean> = this.assassinCardClicked$$.asObservable();
  public whoseTurn$: Observable<string> = this.whoseTurnSubject.asObservable();

  constructor(readonly cardsService: CardsService, readonly timerService: TimerService) { }

  public setupInitialGame(): void {
    this.assignTeamThatGoesFirst();
  }

  private assignTeamThatGoesFirst(): void {
    const randomNumber = Math.floor(Math.random() * 100);
    if (randomNumber % 2) {
      this.whoseTurnSubject.next(whoseTurn.RedAgent);
      this.cardsService.updateCardSubjects(CardValues.RedAgent);

    } else {
      this.whoseTurnSubject.next(whoseTurn.BlueAgent);
      this.cardsService.updateCardSubjects(CardValues.BlueAgent);


    }
  }

  public checkTurnAndCardValue(card): void {
    if (this.whoseTurnSubject.value === whoseTurn.RedAgent && card.value === CardValues.RedAgent) {
      console.log('You got it right');
    }
    if (this.whoseTurnSubject.value === whoseTurn.BlueAgent && card.value === CardValues.BlueAgent) {
      console.log('You got it right');
    }
    if (this.whoseTurnSubject.value === whoseTurn.RedAgent && card.value === CardValues.BlueAgent) {
      console.log(`That was blue's card, turn over!`);
      this.whoseTurnSubject.next(whoseTurn.BlueAgent);
    }
    if (this.whoseTurnSubject.value === whoseTurn.BlueAgent && card.value === CardValues.RedAgent) {
      console.log(`That was red's card!`);
      this.whoseTurnSubject.next(whoseTurn.RedAgent);
    }
    if (card.value === CardValues.Bystander) {
      console.log('That card was an innocent bystander');
      this.whoseTurnSubject.getValue() === whoseTurn.BlueAgent ? this.whoseTurnSubject.next(whoseTurn.RedAgent) : this.whoseTurnSubject.next(whoseTurn.BlueAgent);
    }
    if (card.value === CardValues.Assassin) {
      this.updateAssassinSubject();
      // this.assassinCardClicked$$.next(true);
      console.log('You have been assassinated. Game Over');
      // alert('You have been assassinated. Game Over');
    }
  }

  private updateAssassinSubject(): void {
    this.assassinCardClicked$$.next(true)
    setTimeout(() => this.assassinCardClicked$$.next(false), 20000);
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
