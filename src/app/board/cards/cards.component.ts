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
  @ViewChild('card') card: ElementRef;
  playingCards$ = this.cardsService.cardValuesAndCardDeck$;
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
    console.log(event);
    this.gameManager.checkTurnAndCardValue(event);
    if (card.value === CardValues.RedAgent) {
      console.log(this.card);
      this.renderer.addClass(this.card.nativeElement, 'red-card');
    }
  }
}
