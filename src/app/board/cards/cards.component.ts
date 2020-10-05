import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  playingCards$ = this.cardsService.assignCardValuesAndCardDeck$;

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    // this.cardsService.randomizeWhatColorGoesFirst();
  }
}
