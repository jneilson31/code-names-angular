import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  customSuccess(message: string, duration?: number) {
    alertify.success(message).setting({
      'transition': 'pulse',
      'basic': true,
    }).show()
  }

  customAssassin(winningTeam, duration?: number) {
    alertify.alert().setting({
      'title': `I'm sorry, you've uncovered the assassin! ${winningTeam} team wins!`,
      'transition': 'pulse',
      'startMaximized' : true,
      'message': `<div class="backdrop">
      <div class="embed-responsive embed-responsive-16by9">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/qyu3qmWYAbQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
    `
    }, duration).show()
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
}
