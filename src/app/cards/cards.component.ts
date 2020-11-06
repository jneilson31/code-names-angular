import { Component, OnInit, Renderer2 } from '@angular/core';
import { map } from 'rxjs/operators';
import { CardsService, CardValues, CodeNamesCard } from 'src/app/services/cards.service';
import { GameManagerService } from 'src/app/services/game-manager.service';

export interface CardVm {
  cards: CodeNamesCard[];
  whoseTurn: string;
  cardClicked: boolean;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  public showLegend: boolean;
  playingCards$ = this.cardsService.cardDeck$;
  whoseTurn$ = this.gameManager.whoseTurn$;

  constructor(
    private cardsService: CardsService,
    private gameManager: GameManagerService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
  }

  public onCardClick(event, card): void {
    if (!card.cardClicked) {
      card.cardClicked = true;
      this.gameManager.checkTurnAndCardValue(card);
      this.revealCardValue(event, card);
      this.cardsService.removeCardFromDeck(card);
    }
    return;

  }

  private revealCardValue(event, card) {
    if (card.value === CardValues.RedAgent) {
      this.renderer.addClass(event.currentTarget, 'red-card');
    }
    if (card.value === CardValues.BlueAgent) {
      this.renderer.addClass(event.currentTarget, 'blue-card');
    }
    if (card.value === CardValues.Assassin) {
      this.renderer.addClass(event.currentTarget, 'black-card');
    }
    if (card.value === CardValues.Bystander) {
      this.renderer.addClass(event.currentTarget, 'brown-card');
    }
  }
}
