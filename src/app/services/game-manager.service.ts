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

  // private colorOfFirstTurnSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  // public colorOfFirstTurn$: Observable<string> = this.colorOfFirstTurnSubject.asObservable();

  private whoseTurnSubject: BehaviorSubject<string> = new BehaviorSubject(null);
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
    if (this.whoseTurnSubject.value === 'red' && card.value === CardValues.RedAgent) {
      console.log('You got it right');
    }
    if (this.whoseTurnSubject.value === 'blue' && card.value === CardValues.BlueAgent) {
      console.log('You got it right');
    }
    if (this.whoseTurnSubject.value === 'red' && card.value === CardValues.BlueAgent) {
      console.log(`That was blue's card, turn over!`);
      this.whoseTurnSubject.next('blue');
    }
    if (this.whoseTurnSubject.value === 'blue' && card.value === CardValues.RedAgent) {
      console.log(`That was red's card!`);
      this.whoseTurnSubject.next('red');
    }
    if ((this.whoseTurnSubject.value === 'red' || this.whoseTurnSubject.value === 'blue') && card.value === CardValues.Bystander) {
      console.log('That card was an innocent bystander');
      this.whoseTurnSubject.getValue() === 'blue' ? this.whoseTurnSubject.next('red') : this.whoseTurnSubject.next('blue');
    }
    if ((this.whoseTurnSubject.value === 'red' || this.whoseTurnSubject.value === 'blue') && card.value === CardValues.Assassin) {
      console.log('You have been assassinated. Game Over');
      alert('You have been assassinated. Game Over');
    }
  }

  private updateWhoseTurn(): void {
    this.whoseTurnSubject.value === 'red'
    ? this.whoseTurnSubject.next('blue')
    : this.whoseTurnSubject.next('red');
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
