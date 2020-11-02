import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CardsService, CodeNamesCard } from 'src/app/services/cards.service';

export interface ColorDeckVm {
  cards: CodeNamesCard[];
}

@Component({
  selector: 'app-red-deck',
  templateUrl: './red-deck.component.html',
  styleUrls: ['./red-deck.component.scss']
})
export class RedDeckComponent implements OnInit {

  constructor(private readonly cardsService: CardsService) { }

  public redDeckVm$: Observable<ColorDeckVm>;

  ngOnInit(): void {
    this.redDeckVm$ = this.cardsService.assignedRedCards$.pipe(
      map((cards) => {
        return {
          cards: cards
        }
      }),
      tap(results => console.log(results)),
    );
  }

}
