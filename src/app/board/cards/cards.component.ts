import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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
  playingCards$ = this.cardsService.cardValuesAndCardDeck$;
  whoseTurn$ = this.gameManager.whoseTurn$;
  cardsVm$: Observable<CardVm>;

  constructor(
    private cardsService: CardsService,
    private gameManager: GameManagerService,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
  }

  public onCardClick(card): void {
    console.log(card);
    this.gameManager.checkTurnAndCardValue(card);
    if (card.value === CardValues.RedAgent) {
      console.log("got here");
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'red');
    }
  }
}
