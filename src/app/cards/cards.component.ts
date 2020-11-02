import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsService, CardValues, CodeNamesCard } from 'src/app/services/cards.service';
import { GameManagerService } from 'src/app/services/game-manager.service';

export interface CardVm {
  cards: CodeNamesCard[];
  whoseTurn: string;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  // playingCards$ = this.cardsService.codeNamesCardDeck$;
  // playingCards$ = this.cardsService.initialDeck$;

  whoseTurn$ = this.gameManager.whoseTurn$;
  cardsVm$: Observable<CardVm>;

  constructor(
    private cardsService: CardsService,
    private gameManager: GameManagerService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
  }

  public onCardClick(event, card): void {
    this.gameManager.checkTurnAndCardValue(card);
    this.revealCardValueAndUpdate(event, card);
    // this.cardsService.updateRedCardsNegative(card);
  }

  private revealCardValueAndUpdate(event, card) {
    if (card.value === CardValues.RedAgent) {
      // this.cardsService.updateNumberOfRedCards(false);
      this.renderer.addClass(event.currentTarget, 'red-card');
    }
    if (card.value === CardValues.BlueAgent) {
      // this.cardsService.updateNumberOfBlueCards(false);
      this.renderer.addClass(event.currentTarget, 'blue-card');
    }
    if (card.value === CardValues.Assassin) {
      this.renderer.addClass(event.currentTarget, 'black-card');
    }
    if (card.value === CardValues.Bystander) {
      this.renderer.addClass(event.currentTarget, 'brown-card');
    }
  }

  public revealCardLegend(card): void {
    console.log("revealed card values");
  }

  public revealGameBoard(): void {
    console.log("back to normal");
  }
}
