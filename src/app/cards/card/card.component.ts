import { Component, Input, OnInit } from '@angular/core';
import { CodeNamesCard } from 'src/app/services/cards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: CodeNamesCard;

  constructor() { }

  ngOnInit(): void {
    console.log(this.card);
  }

}
