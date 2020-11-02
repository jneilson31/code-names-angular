import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

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
  private redAgentCards$$: BehaviorSubject<number> = new BehaviorSubject(8);
  private blueAgentCards$$: BehaviorSubject<number> = new BehaviorSubject(8);
  private assassinCards$$: BehaviorSubject<number> = new BehaviorSubject(1);

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

  public cardDeck$$: Observable<CodeNamesCard[]> = combineLatest([
    this.numberOfCardsInPlay$$,
    this.redAgentCards$$,
    this.blueAgentCards$$,
    this.assassinCards$$,
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

  public redCardDeck$: Observable<CodeNamesCard[]> = this.cardDeck$$.pipe(
    map(cards => cards.filter(card => card.value === CardValues.RedAgent)),
  );

  public blueCardDeck$: Observable<CodeNamesCard[]> = this.cardDeck$$.pipe(
    map(cards => cards.filter(card => card.value === CardValues.BlueAgent)),
  );

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
    ? this.redAgentCards$$.next(this.redAgentCards$$.getValue() + 1)
    : this.blueAgentCards$$.next(this.blueAgentCards$$.getValue() + 1);
  }
}
