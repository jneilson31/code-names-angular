import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertifyService } from '../services/alertify.service';
import { GameManagerService } from '../services/game-manager.service';
import { TimerService } from '../services/timer.service';

export interface GameBoardVm {
  whoseTurn: string;
  assassinCardClicked: boolean;
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
  assassinCardClicked: boolean;

  constructor(
    private readonly gameManager: GameManagerService,
    private readonly timerService: TimerService,
    private readonly alertifyService: AlertifyService
    ) { }

  ngOnInit(): void {
    this.gameBoardVm$ = combineLatest([
      this.gameManager.whoseTurn$,
      this.gameManager.assassinCardClicked$,
      this.timerService.timer$,
    ]).pipe(
      map(([
        colorOfFirstTurn,
        assassinCardClicked,
        gameTimer
      ]) => {
        return {
          whoseTurn: colorOfFirstTurn,
          assassinCardClicked: assassinCardClicked,
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
