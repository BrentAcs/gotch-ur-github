import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [AppComponent, SortPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  exports: [],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
