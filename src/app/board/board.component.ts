import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GameManagerService } from '../services/game-manager.service';
import { TimerService } from '../services/timer.service';

export interface GameBoardVm {
  whoseTurn: string;
  gameTimer: number;

}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  gameBoardVm$: Observable<GameBoardVm>;
  showLegend: boolean;

  constructor(
    private readonly gameManager: GameManagerService,
    private readonly timerService: TimerService
    ) { }

  ngOnInit(): void {
    this.gameBoardVm$ = combineLatest([
      this.gameManager.whoseTurn$,
      this.timerService.timer$,
    ]).pipe(
      map(([
        colorOfFirstTurn,
        gameTimer
      ]) => {
        return {
          whoseTurn: colorOfFirstTurn,
          gameTimer
        };
      })
    );
    this.showLegend = false;
    this.gameManager.setupInitialGame();
  }

  public toggleCardLegend(): void {
    this.showLegend = !this.showLegend;
  }

}
