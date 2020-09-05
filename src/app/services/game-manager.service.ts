import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardsService } from './cards.service';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  private colorOfFirstTurnSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  public colorOfFirstTurn$: Observable<string> = this.colorOfFirstTurnSubject.asObservable();

  constructor(readonly cardsService: CardsService) { }

  // public randomizeWhatColorGoesFirst(): void {
  //   const randomNumber = Math.floor(Math.random() * 100);
  //   if (randomNumber % 2) {
  //     this.colorOfFirstTurnSubject.next('red');
  //     this.cardsService.updatePlayerCards('red');
  //     this.redAgentCardsSubject.next(this.redAgentCardsSubject.getValue() + 1);
  //     console.log('Red first', this.redAgentCardsSubject.getValue());
  //     console.log('Blue', this.blueAgentCardsSubject.getValue());
  //   } else {
  //     this.colorOfFirstTurnSubject.next('blue');
  //     this.blueAgentCardsSubject.next(this.blueAgentCardsSubject.getValue() + 1);
  //     console.log('Blue first', this.blueAgentCardsSubject.getValue());
  //     console.log('Red', this.redAgentCardsSubject.getValue());
  //   }
  // }
}
