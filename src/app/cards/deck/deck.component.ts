import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardsService, CodeNamesCard } from 'src/app/services/cards.service';

export interface DeckVm {
  // redAgentDeck: CodeNamesCard[];
  // blueAgentDeck: CodeNamesCard[];
  agentDeck: CodeNamesCard[];
  cardsRemaining: number;
}

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  @Input() color: string;

  constructor(private readonly cardsService: CardsService) { }

  public deckVm$: Observable<DeckVm>;

  ngOnInit(): void {
    this.deckVm$ = combineLatest([
      this.cardsService.redCardDeck$,
      this.cardsService.blueCardDeck$,
      this.cardsService.exisitingRedCards$,
      this.cardsService.existingBlueDeck$,
    ]).pipe(
      map(([redDeck, blueDeck, remainingRedCards, remainingBlueCards]) => {
        return {
          redAgentDeck: redDeck,
          blueAgentDeck: blueDeck,
          agentDeck: this.color === 'red' ? remainingRedCards : remainingBlueCards,
          cardsRemaining: this.color === 'red' ? remainingRedCards.length : remainingBlueCards.length
        };
      })
    );
  }
}
