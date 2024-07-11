import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {BookslistComponent} from './bookslist/bookslist.component';
import {HighlightPipe} from '../pipes/highlight.pipe'; 

@NgModule({
  declarations: [
    AppComponent,
    BookslistComponent,
    HighlightPipe 
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
