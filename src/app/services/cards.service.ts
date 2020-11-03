import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay, take, tap } from 'rxjs/operators';

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
  private numberOfCardsInPlay$$: BehaviorSubject<number> = new BehaviorSubject(25);
  private numberOfRedAgentCards$$: BehaviorSubject<number> = new BehaviorSubject(8);
  private numberOfBlueAgentCards$$: BehaviorSubject<number> = new BehaviorSubject(8);
  private numberOfAssassinCards$$: BehaviorSubject<number> = new BehaviorSubject(1);
  private exisitingRedDeck$$: BehaviorSubject<CodeNamesCard[]> = new BehaviorSubject([]);
  public exisitingRedCards$: Observable<CodeNamesCard[]> = this.exisitingRedDeck$$.asObservable();
  private existingBlueDeck$$: BehaviorSubject<CodeNamesCard[]> = new BehaviorSubject([]);
  public existingBlueDeck$: Observable<CodeNamesCard[]> = this.existingBlueDeck$$.asObservable();

  private wordPool: string[] = [
    'turkey', 'king', 'revolution', 'soap',
    'shot', 'television', 'fair', 'cheat',
    'gas', 'banana', 'tooth', 'plant',
    'bar', 'mouse', 'game', 'keyboard',
    'pit', 'phone', 'cricket', 'cells',
    'apple', 'blood', 'hollywood', 'pills',
    'hook', 'frame', 'sword', 'skirt',
    'dinosaur', 'tissue', 'bat', 'boxes',
    'amazon', 'headphones', 'park', 'speaker',
    'pin', 'president', 'pitch', 'backpack',
    'bear', 'ruler', 'staff', 'towel',
    'oil', 'journey', 'life', 'pirate',
    'queen', 'time'];

  public cardDeck$: Observable<CodeNamesCard[]> = combineLatest([
    this.numberOfCardsInPlay$$,
    this.numberOfRedAgentCards$$,
    this.numberOfBlueAgentCards$$,
    this.numberOfAssassinCards$$,
  ]).pipe(
    map(([
      numberOfCardsInPlay,
      numberOfRedCards,
      numberOfBlueCards,
      numberOfAssassinCards]) => {
        this.shuffleCards(this.wordPool);
        const deck = this.wordPool.slice(0, numberOfCardsInPlay);
        const redCardList = this.assignCardValues(deck.slice(
          0, numberOfRedCards), CardValues.RedAgent);
        const blueCardList = this.assignCardValues(deck.slice(
          numberOfRedCards, numberOfBlueCards + numberOfRedCards), CardValues.BlueAgent);
        const assassinCardList = this.assignCardValues(deck.slice(
          (numberOfBlueCards + numberOfRedCards),
          numberOfBlueCards + numberOfRedCards + numberOfAssassinCards), CardValues.Assassin);
        const bystanderCardList = this.assignCardValues(deck.slice(
          (numberOfBlueCards + numberOfRedCards + numberOfAssassinCards), deck.length
        ), CardValues.Bystander);
        const gameDeck = redCardList.concat(blueCardList, assassinCardList, bystanderCardList);
        this.shuffleCards(gameDeck);
        return gameDeck;
      }),
      shareReplay(),
  );

  public redCardDeck$: Observable<CodeNamesCard[]> = this.cardDeck$.pipe(
    map(cards => {
      const redDeck = cards.filter(card => card.value === CardValues.RedAgent);
      return redDeck;
    }),
    tap(result => this.exisitingRedDeck$$.next(result))
  );

  public blueCardDeck$: Observable<CodeNamesCard[]> = this.cardDeck$.pipe(
    map(cards => {
      const blueDeck = cards.filter(card => card.value === CardValues.BlueAgent);
      return blueDeck;
    }),
    tap(result => this.existingBlueDeck$$.next(result))
  );

  public removeCardFromDeck(cardFromClick: CodeNamesCard): void {
    const wordOfCardToRemove = cardFromClick.word;
    if (cardFromClick.value === CardValues.RedAgent) {
      this.exisitingRedDeck$$.pipe(
        take(1),
        map(cards => {
          const updatedRedDeck = cards.filter(card => card.word !== wordOfCardToRemove);
          console.log(`actualRedDeckBeforeNext `, this.exisitingRedDeck$$.getValue());
          this.exisitingRedDeck$$.next(updatedRedDeck);
          console.log(`actualRedDeckAfterNext `, this.exisitingRedDeck$$.getValue());
        }),
      ).subscribe();
    }
    if (cardFromClick.value === CardValues.BlueAgent) {
      this.existingBlueDeck$$.pipe(
        take(1),
        map(cards => {
          const updatedBlueDeck = cards.filter(card => card.word !== wordOfCardToRemove);
          console.log(`actualBlueDeckBeforeNext `, this.existingBlueDeck$$.getValue());
          this.existingBlueDeck$$.next(updatedBlueDeck);
          console.log(`actualBlueDeckAfterNext `, this.existingBlueDeck$$.getValue());
        }),
      ).subscribe();
    }
  }

  private assignCardValues(words: string[], agentColor: CardValues): CodeNamesCard[] {
    return words.map(word => ({
      word,
      value: agentColor
    }));
  }

  public shuffleCards(array: any[]) {
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
    ? this.numberOfRedAgentCards$$.next(this.numberOfRedAgentCards$$.getValue() + 1)
    : this.numberOfBlueAgentCards$$.next(this.numberOfBlueAgentCards$$.getValue() + 1);
  }
}


// cardDeck that doesn't change, it's the same throughout the entire game, board references this.

// redDeckSubject that can change when the word from it is clicked on
// redDeckObservable that is based off the subject.

// blueDeckSubject that can change when the word from it is clicked on
// blueDeckObservable that is based off the subject.
