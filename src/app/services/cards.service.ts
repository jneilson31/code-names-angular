import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';

export enum CardValues {
  RedAgent = 'Red Agent',
  BlueAgent = 'Blue Agent',
  Assassin = 'Assassin',
  Bystander = 'Bystander'
}
export interface CodeNamesCard {
  word: string;
  value: CardValues;
  cardClicked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private numberOfCardsInPlay$$: BehaviorSubject<number> = new BehaviorSubject(25);
  private numberOfRedAgentCards$$: BehaviorSubject<number> = new BehaviorSubject(8);
  private numberOfBlueAgentCards$$: BehaviorSubject<number> = new BehaviorSubject(8);
  private numberOfAssassinCards$$: BehaviorSubject<number> = new BehaviorSubject(1);
  private redAgentDeck$$: BehaviorSubject<CodeNamesCard[]> = new BehaviorSubject([]);
  public redAgentDeck$: Observable<CodeNamesCard[]> = this.redAgentDeck$$.asObservable();
  private blueAgentDeck$$: BehaviorSubject<CodeNamesCard[]> = new BehaviorSubject([]);
  public blueAgentDeck$: Observable<CodeNamesCard[]> = this.blueAgentDeck$$.asObservable();

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
        this.redAgentDeck$$.next(redCardList);
        const blueCardList = this.assignCardValues(deck.slice(
          numberOfRedCards, numberOfBlueCards + numberOfRedCards), CardValues.BlueAgent);
        this.blueAgentDeck$$.next(blueCardList);
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

  public removeCardFromDeck(cardFromClick: CodeNamesCard): void {
    const wordOfCardToRemove = cardFromClick.word;
    if (cardFromClick.value === CardValues.RedAgent) {
      this.redAgentDeck$$.pipe(
        take(1),
        map(cards => {
          const updatedRedDeck = cards.filter(card => card.word !== wordOfCardToRemove);
          this.redAgentDeck$$.next(updatedRedDeck);
        }),
      ).subscribe();
    }
    if (cardFromClick.value === CardValues.BlueAgent) {
      this.blueAgentDeck$$.pipe(
        take(1),
        map(cards => {
          const updatedBlueDeck = cards.filter(card => card.word !== wordOfCardToRemove);
          this.blueAgentDeck$$.next(updatedBlueDeck);
        }),
      ).subscribe();
    }
  }

  private assignCardValues(words: string[], agentColor: CardValues): CodeNamesCard[] {
    return words.map(word => ({
      word,
      value: agentColor,
      cardClicked: false
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
