import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { CardsService, CardValues } from './cards.service';
import { TimerService } from './timer.service';

export enum whoseTurn {
  RedAgent = 'Red',
  BlueAgent = 'Blue',
}

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  private whoseTurnSubject: BehaviorSubject<whoseTurn> = new BehaviorSubject(null);
  private assassinCardClicked$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public assassinCardClicked$: Observable<boolean> = this.assassinCardClicked$$.asObservable();
  public whoseTurn$: Observable<string> = this.whoseTurnSubject.asObservable();

  constructor(private readonly cardsService: CardsService,
              private readonly timerService: TimerService,
              private readonly alertifyService: AlertifyService
              ) { }

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
      this.alertifyService.success(`Awesome job ${whoseTurn.RedAgent.toLowerCase()}! You found one of your missing agents!`, 3);
    }
    if (this.whoseTurnSubject.value === whoseTurn.BlueAgent && card.value === CardValues.BlueAgent) {
      this.alertifyService.success(`Awesome job ${whoseTurn.BlueAgent.toLowerCase()}! You found one of your missing agents!`, 3);
    }
    if (this.whoseTurnSubject.value === whoseTurn.RedAgent && card.value === CardValues.BlueAgent) {
      this.whoseTurnSubject.next(whoseTurn.BlueAgent);
      this.alertifyService.error(`You were mistaken, you've uncovered a ${whoseTurn.BlueAgent.toLowerCase()} agent!`, 3);

    }
    if (this.whoseTurnSubject.value === whoseTurn.BlueAgent && card.value === CardValues.RedAgent) {
      this.whoseTurnSubject.next(whoseTurn.RedAgent);
      this.alertifyService.error(`You were mistaken, you've uncovered a ${whoseTurn.RedAgent.toLowerCase()} agent!`, 3);

    }
    if (card.value === CardValues.Bystander) {
      this.alertifyService.warning("You really thought this civilian was an undercover agent? Were you distracted?", 5);
      this.whoseTurnSubject.getValue() === whoseTurn.RedAgent
      ? this.whoseTurnSubject.next(whoseTurn.BlueAgent)
      : this.whoseTurnSubject.next(whoseTurn.RedAgent);
    }
    if (card.value === CardValues.Assassin) {
      this.whoseTurnSubject.getValue() === whoseTurn.RedAgent
      ? this.alertifyService.customAssassin(whoseTurn.BlueAgent)
      : this.alertifyService.customAssassin(whoseTurn.RedAgent);
    }
  }

  // private updateAssassinSubject(): void {
  //   this.assassinCardClicked$$.next(true)
  //   setTimeout(() => this.assassinCardClicked$$.next(false), 20000);
  // }

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
