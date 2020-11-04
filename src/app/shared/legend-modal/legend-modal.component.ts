import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-legend-modal',
  templateUrl: './legend-modal.component.html',
  styleUrls: ['./legend-modal.component.scss']
})
export class LegendModalComponent implements OnInit {

  constructor(private readonly cardsService: CardsService) { }
  public style: string;

  playingCards$ = this.cardsService.cardDeck$;

  ngOnInit(): void {

  }

  public getStyle(): void {
    this.style = "red-card";
  }

}
