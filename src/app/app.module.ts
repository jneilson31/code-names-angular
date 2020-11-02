import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardsComponent } from './cards/cards.component';
import { DeckComponent } from './cards/deck/deck.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardsComponent,
    DeckComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
