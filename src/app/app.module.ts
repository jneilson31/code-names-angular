import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardsComponent } from './cards/cards.component';
import { DeckComponent } from './cards/deck/deck.component';
import { LegendModalComponent } from './shared/legend-modal/legend-modal.component';
import { AssassinFeedbackComponent } from './assassin-feedback/assassin-feedback.component';
import { CardComponent } from './cards/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardsComponent,
    DeckComponent,
    LegendModalComponent,
    AssassinFeedbackComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
