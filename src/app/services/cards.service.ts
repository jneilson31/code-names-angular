import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, shareReplay, skip, take, takeWhile, tap } from 'rxjs/operators';

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
  private redAgentCards$$: BehaviorSubject<number> = new BehaviorSubject(8);
  private blueAgentCards$$: BehaviorSubject<number> = new BehaviorSubject(8);
  // public redAgentCards$: Observable<number> = this.redAgentCardsSubject.asObservable();
  // private blueAgentCardsSubject: BehaviorSubject<number> = new BehaviorSubject(8);
  // public blueAgentCards$: Observable<number> = this.blueAgentCardsSubject.asObservable();
  // private assassinsCardsSubject: BehaviorSubject<number> = new BehaviorSubject(1);
  // public assassinCards$: Observable<number> = this.assassinsCardsSubject.asObservable();
  // private colorOfFirstTurnSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  // public colorOfFirstTurn$: Observable<string> = this.colorOfFirstTurnSubject.asObservable();
  private assignedRedCards$$: BehaviorSubject<CodeNamesCard[]> = new BehaviorSubject([]);
  public assignedRedCards$: Observable<CodeNamesCard[]> = this.assignedRedCards$$.asObservable();

  // private wordPool$: Observable<CodeNamesCard[]> = of([
  //   'turkey', 'king',},
  //   'revolution', 'soap',},
  //   'shot', 'television',},
  //   'fair', 'cheat',},
  //   'gas', 'banana',},
  //   'tooth', 'plant',},
  //   'bar', 'mouse',},
  //   'game', 'keyboard',},
  //   'pit', 'phone',},
  //   'cricket', 'cells',},
  //   'apple', 'blood',},
  //   'hollywood', 'pills',},
  //   'hook', 'frame',},
  //   'sword', 'skirt',},
  //   'dinosaur', 'tissue',},
  //   'bat', 'boxes',},
  //   'amazon', 'headphones',},
  //   'park', 'speaker',},
  //   'pin', 'president',},
  //   'pitch', 'backpack',},
  //   'bear', 'ruler',},
  //   'staff', 'towel',},
  //   'oil', 'journey',},
  //   'life', 'pirate',},
  //   'queen', 'time',},
  // ]);

  private wordPool: string[] = [
    'turkey', 'king',
    'revolution', 'soap',
    'shot', 'television',
    'fair', 'cheat',
    'gas', 'banana',
    'tooth', 'plant',
    'bar', 'mouse',
    'game', 'keyboard',
    'pit', 'phone',
    'cricket', 'cells',
    'apple', 'blood',
    'hollywood', 'pills',
    'hook', 'frame',
    'sword', 'skirt',
    'dinosaur', 'tissue',
    'bat', 'boxes',
    'amazon', 'headphones',
    'park', 'speaker',
    'pin', 'president',
    'pitch', 'backpack',
    'bear', 'ruler',
    'staff', 'towel',
    'oil', 'journey',
    'life', 'pirate',
    'queen', 'time',
  ];

  // public initialDeck$: Observable<any> = combineLatest([
  //   this.wordPool,
  //   this.numberOfCardsInPlay$,
  // ]).pipe(
  //   tap(result => console.log(`Results: `, result)),
  //   map(([wordPool, numberOfCardsInPlay]) => {
  //     return wordPool.slice(0, numberOfCardsInPlay)
  //   }),
  //   tap(result => console.log(`Results: `, result))
  // )

  // public CodeNamesCard: any = this.wordPool.map(
  //   (word) => {
  //     return {
  //       word: word,
  //       value: CardValues.Bystander
  //     }
  //   });

  // public codeNamesCardDeck$: Observable<any> = combineLatest([
  //   this.redAgentCards$$,
  //   this.wordPool
  // ]).pipe(
  //   map(([redAgentCards, words]) => {
  //     return {
  //       redAgentCards,
  //       words
  //     }
  //   }),
  //   tap(results => console.log(results, `results of combineLatest`))
  // );

  // public codeNamesCardDeck$: Observable<any> = combineLatest([
  //   this.redAgentCards$$,
  //   this.wordPool
  // ]).pipe(
  //   map(([redAgentCards, words]) => {
  //     words.slice(0, redAgentCards).map(word => {

  //     })
  //     const list = [];
  //     console.log(word);
  //     // console.log(`list of red words: `, list);
  //     return list;
  //   }),
  //   // tap(results => console.log(results, `results of combineLatest`))
  // );

  public cardDeck$$ = combineLatest([
    this.redAgentCards$$,
    this.blueAgentCards$$
  ]).pipe(
    map(([
      numberOfRedCards,
      numberOfBlueCards]) => {
     const redCards = this.wordPool.slice(0, numberOfRedCards);
     const blueCards = this.wordPool.slice(numberOfRedCards, numberOfBlueCards + numberOfRedCards);
     const redCardList: CodeNamesCard[] = redCards.map(redCard => ({
      word: redCard,
      value: CardValues.RedAgent
     }));
     const blueCardList: CodeNamesCard[] = blueCards.map(blueCard => ({
      word: blueCard,
      value: CardValues.BlueAgent
     }));
     return {
       redCards: redCardList,
       blueCards: blueCardList
     }
    })
  )

  // public initialDeck$: Observable<CodeNamesCard[]> = combineLatest([
  //   this.numberOfCardsInPlay$,
  //   this.wordPool$,
  // ]).pipe(
  //   map(([numberOfCards, wordPool]) => {
  //     return wordPool.slice(0, numberOfCards)
  //   }),
  //   tap(cards => {
  //     this.shuffleCards(cards);
  //     // this.assignCardValues(cards);
  //     // this.shuffleCards(cards);
  //   }),
  //   shareReplay(1),
  // )

  // public assignedRedCards$: Observable<CodeNamesCard[]> = this.initialDeck$.pipe(
  //   map(cards => cards.filter(card => card.value === CardValues.RedAgent)),
  //   tap(results => console.log(`Result of RedCards: `, results)),
  // )

  // public updateAssignedRedCards(): void {
  //   this.initialDeck$.pipe(
  //    map(cards => {
  //      let redDeck = cards.filter(card => card.value === CardValues.RedAgent);
  //      this.assignedRedCards$$.next(redDeck);
  //     }),
  //   )
  //  }

  // public assignedBlueCards$: Observable<CodeNamesCard[]> = this.initialDeck$.pipe(
  //   map(cards => cards.filter(card => card.value === CardValues.BlueAgent)),
  //   tap(results => console.log(`Result of BlueCards: `, results)),
  // )

  // public assignCardValues(cards: CodeNamesCard[]): void {
  //   const numOfRedCards = this.redAgentCardsSubject.getValue();
  //   // const numOfBlueCards = this.blueAgentCardsSubject.getValue();
  //   // const numOfAssassinCards = this.assassinsCardsSubject.getValue();
  //   const redDeck = cards.slice(0, numOfRedCards);
  //   // const blueDeck = cards.slice(numOfRedCards, (numOfRedCards + numOfBlueCards));
  //   // const assassinCard = cards.slice(numOfBlueCards + numOfRedCards, numOfRedCards + numOfBlueCards + numOfAssassinCards);
  //   redDeck.forEach(card => card.value = CardValues.RedAgent);
  //   // blueDeck.forEach(card => card.value = CardValues.BlueAgent);
  //   // assassinCard.forEach(card => card.value = CardValues.Assassin);
  //   this.assignedRedCards$$.next(redDeck);
  //   console.log(redDeck);
  // }

  // public updateNumberOfRedCards(startOfGame?: boolean): void {
  //   !startOfGame
  //   ? this.redAgentCardsSubject.next(this.redAgentCardsSubject.getValue() - 1)
  //   : this.redAgentCardsSubject.next(this.redAgentCardsSubject.getValue() + 1);
  //   console.log(`redCardUpdate: `, this.redAgentCardsSubject.getValue());
  // }

  // public updateNumberOfBlueCards(startOfGame?: boolean): void {
  //   !startOfGame
  //   ? this.blueAgentCardsSubject.next(this.blueAgentCardsSubject.getValue() - 1)
  //   : this.blueAgentCardsSubject.next(this.blueAgentCardsSubject.getValue() + 1);
  //   console.log(`blueCardUpdate: `, this.blueAgentCardsSubject.getValue());
  // }

  // public updateRedCards(): void {
  //   this.redAgentCardsSubject.next((this.redAgentCardsSubject.getValue() + 1));
  // }

  // public updateRedCardsNegative(clickedCard: CodeNamesCard): void {
  //   this.assignedRedCards$.pipe(
  //     map(cards => cards.filter(card => clickedCard.word !== card.word)),
  //     // tap(result => console.log(`result: `, result)),
  //     tap(result => this.assignedRedCards$$.next(result)),
  //   )
  // }

  // public shuffleCards(array: CodeNamesCard[]) {
  //   var currentIndex = array.length, temporaryValue, randomIndex;
  //   while (0 !== currentIndex) {
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // }

  public shuffleCards(array: string[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  public updateCardSubjects(colorToUpdate: CardValues) {
    colorToUpdate === CardValues.RedAgent
    ? this.redAgentCards$$.next(this.redAgentCards$$.getValue() + 1)
    : this.blueAgentCards$$.next(this.blueAgentCards$$.getValue() + 1)
  }


}
