import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardsService } from '../services/cards.service';
import { GameManagerService } from '../services/game-manager.service';
import { TimerService } from '../services/timer.service';

export interface GameBoardVm {
  whoseTurn: string;
  redTeamCardsRemaining: number;
  blueTeamCardsRemaining: number;
  gameTimer: {
    minutes: number;
    seconds: number;
  };

}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  colorOfTeamToGoFirst$ = this.gameManager.colorOfFirstTurn$;
  redTeamCardsRemaining$ = this.cardsService.redAgentCards$;
  blueTeamCardsRemaining$ = this.cardsService.blueAgentCards$;
  gameBoardVm$: Observable<GameBoardVm>;

  constructor(
    private readonly gameManager: GameManagerService,
    private readonly cardsService: CardsService,
    private readonly timerService: TimerService
    ) { }

  ngOnInit(): void {
    this.gameBoardVm$ = combineLatest([
      this.gameManager.colorOfFirstTurn$,
      this.cardsService.redAgentCards$,
      this.cardsService.blueAgentCards$,
      this.timerService.playClockWithMinutesAndSeconds$,
    ]).pipe(
      map(([
        colorOfFirstTurn,
        redAgentCards,
        blueAgentCards,
        gameTimer
      ]) => {
        return {
          whoseTurn: colorOfFirstTurn,
          redTeamCardsRemaining: redAgentCards,
          blueTeamCardsRemaining: blueAgentCards,
          gameTimer
        };
      })
    );

    this.gameManager.setupInitialGame();
  }

}
