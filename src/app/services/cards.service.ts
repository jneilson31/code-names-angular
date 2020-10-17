import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameManagerService } from './game-manager.service';

export enum CardValues {
  RedAgent = 'Red Agent',
  BlueAgent = 'Blue Agent',
  Assassin = 'Assassin',
  Bystander = 'Bystander'
}
export interface CodeNamesCard {
  word: string;
  value: CardValues;
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private numberOfCardsInPlaySubject: BehaviorSubject<number> = new BehaviorSubject(25);
  public numberOfCardsInPlay$: Observable<number> = this.numberOfCardsInPlaySubject.asObservable();
  private redAgentCardsSubject: BehaviorSubject<number> = new BehaviorSubject(8);
  public redAgentCards$: Observable<number> = this.redAgentCardsSubject.asObservable();
  private blueAgentCardsSubject: BehaviorSubject<number> = new BehaviorSubject(8);
  public blueAgentCards$: Observable<number> = this.blueAgentCardsSubject.asObservable();
  private assassinsCardsSubject: BehaviorSubject<number> = new BehaviorSubject(1);
  public assassinCards$: Observable<number> = this.assassinsCardsSubject.asObservable();
  private colorOfFirstTurnSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  public colorOfFirstTurn$: Observable<string> = this.colorOfFirstTurnSubject.asObservable();

  private wordPool$: Observable<CodeNamesCard[]> = of([
    { word: 'turkey', value: CardValues.Bystander }, { word: 'king', value: CardValues.Bystander },
    { word: 'revolution', value: CardValues.Bystander }, { word: 'soap', value: CardValues.Bystander },
    { word: 'shot', value: CardValues.Bystander }, { word: 'soap', value: CardValues.Bystander },
    { word: 'fair', value: CardValues.Bystander }, { word: 'cheat', value: CardValues.Bystander },
    { word: 'gas', value: CardValues.Bystander }, { word: 'banana', value: CardValues.Bystander },
    { word: 'tooth', value: CardValues.Bystander }, { word: 'plant', value: CardValues.Bystander },
    { word: 'bar', value: CardValues.Bystander }, { word: 'mouse', value: CardValues.Bystander },
    { word: 'game', value: CardValues.Bystander }, { word: 'keyboard', value: CardValues.Bystander },
    { word: 'pit', value: CardValues.Bystander }, { word: 'phone', value: CardValues.Bystander },
    { word: 'cricket', value: CardValues.Bystander }, { word: 'cells', value: CardValues.Bystander },
    { word: 'apple', value: CardValues.Bystander }, { word: 'blood', value: CardValues.Bystander },
    { word: 'hollywood', value: CardValues.Bystander }, { word: 'pills', value: CardValues.Bystander },
    { word: 'hook', value: CardValues.Bystander }, { word: 'frame', value: CardValues.Bystander },
    { word: 'sword', value: CardValues.Bystander }, { word: 'skirt', value: CardValues.Bystander },
    { word: 'dinosaur', value: CardValues.Bystander }, { word: 'tissue', value: CardValues.Bystander },
    { word: 'bat', value: CardValues.Bystander }, { word: 'boxes', value: CardValues.Bystander },
    { word: 'amazon', value: CardValues.Bystander }, { word: 'headphones', value: CardValues.Bystander },
    { word: 'park', value: CardValues.Bystander }, { word: 'speaker', value: CardValues.Bystander },
    { word: 'pin', value: CardValues.Bystander }, { word: 'president', value: CardValues.Bystander },
    { word: 'pitch', value: CardValues.Bystander }, { word: 'backpack', value: CardValues.Bystander },
    { word: 'bear', value: CardValues.Bystander }, { word: 'ruler', value: CardValues.Bystander },
    { word: 'staff', value: CardValues.Bystander }, { word: 'towel', value: CardValues.Bystander },
    { word: 'oil', value: CardValues.Bystander }, { word: 'journey', value: CardValues.Bystander },
    { word: 'life', value: CardValues.Bystander }, { word: 'pirate', value: CardValues.Bystander },
    { word: 'queen', value: CardValues.Bystander }, { word: 'time', value: CardValues.Bystander },
  ]);

  public cardValuesAndCardDeck$ = combineLatest([
    this.numberOfCardsInPlay$,
    this.wordPool$,
    this.redAgentCards$,
    this.blueAgentCards$,
    this.assassinCards$,
    ]).pipe(
      map(([numberOfCardsInPlay, wordPool, redAgentCards, blueAgentCards, assassinCards]) => {
        this.shuffleDeck(wordPool);
        const cardDeck = wordPool.slice(0, numberOfCardsInPlay);
        const redCards = cardDeck.slice(0, redAgentCards);
        redCards.forEach(card => card.value = CardValues.RedAgent);
        const blueCards = cardDeck.slice(redAgentCards, (blueAgentCards + redAgentCards));
        blueCards.forEach(card => card.value = CardValues.BlueAgent);
        const blackCards = cardDeck.slice((blueAgentCards + redAgentCards), (blueAgentCards + redAgentCards + assassinCards));
        blackCards.forEach(card => card.value = CardValues.Assassin);
        console.log(`BlackCards: `, blackCards);
        console.log(`redCards: `, redCards);
        console.log(`blueCards: `, blueCards);
        console.log(`cardDeck: `, cardDeck);
        return this.shuffleDeck(cardDeck);
      }),
  );



  constructor() { }

  public shuffleDeck(cards: CodeNamesCard[]): CodeNamesCard[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
    return cards;
  }

  public updateNumberOfRedCards(): any {
    this.redAgentCardsSubject.next(this.redAgentCardsSubject.getValue() + 1);
  }

  public updateNumberOfBlueCards(): any {
    this.blueAgentCardsSubject.next(this.blueAgentCardsSubject.getValue() + 1);
  }
}
