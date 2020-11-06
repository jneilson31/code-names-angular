import { Injectable } from '@angular/core';
import { whoseTurn } from './game-manager.service';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  customAssassin(winningTeam) {
    alertify.alert().setting({
      'title': `I'm sorry, you've uncovered the assassin! ${winningTeam} team wins!`,
      'transition': 'pulse',
      'label': 'Game Over',
      'startMaximized' : true,
      'message': `<div class="backdrop">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/qyu3qmWYAbQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
    `
    }).show()
  }


  success(message?: string, duration?: number) {
    alertify.set('notifier','position', 'bottom-center');
    alertify.success(message, duration);
  }

  error(message: string, duration?: number) {
    alertify.set('notifier','position', 'bottom-center');
    alertify.error(message, duration);
  }

  warning(message: string, duration?: number) {
    alertify.set('notifier','position', 'bottom-center');
    alertify.warning(message, duration);
  }

  message(message: string, duration?: number) {
    alertify.message(message, duration);
  }

  gameOverAlert(winningTeam: string) {
    alertify.alert().setting({
      // 'title': `${winningTeam} agents win!`,
      'basic': true,
      'transition': 'pulse',
      'label': 'Game Over',
      'startMaximized' : true,
      'message': `<div class="winner-container">
      <h1 class="winning-text">${winningTeam} Agents Win!</h1>
    </div>`
    }).show()
  }
}
