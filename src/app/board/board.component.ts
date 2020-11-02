import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardsService, CodeNamesCard } from '../services/cards.service';
import { GameManagerService } from '../services/game-manager.service';
import { TimerService } from '../services/timer.service';

export interface GameBoardVm {
  whoseTurn: string;
  // redTeamCards: CodeNamesCard[];
  // blueTeamCards: CodeNamesCard[];
  cards: any;
  gameTimer: number;

}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  gameBoardVm$: Observable<any>;

  constructor(
    private readonly gameManager: GameManagerService,
    private readonly cardsService: CardsService,
    private readonly timerService: TimerService
    ) { }

  ngOnInit(): void {
    this.cardsService.cardDeck$$.subscribe(cards => {
      console.log("all the cards", cards);
    });
    this.gameBoardVm$ = combineLatest([
      this.gameManager.whoseTurn$,
      // this.cardsService.codeNamesCardDeck$,
      // this.cardsService.assignedRedCards$,
      // this.cardsService.assignedBlueCards$,
      this.timerService.timer$,
    ]).pipe(
      map(([
        colorOfFirstTurn,
        // cards,
        // redAgentCards,
        // blueAgentCards,
        gameTimer
      ]) => {
        return {
          whoseTurn: colorOfFirstTurn,
          // cards: cards,
          // redTeamCards: redAgentCards,
          // blueTeamCards: blueAgentCards,
          gameTimer
        };
      })
      );

    // console.log(`adfadfa`, this.cardsService.CodeNamesCard);
    this.gameManager.setupInitialGame();
  }

}
