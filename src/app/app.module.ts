import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SortPipe } from './pipes/sort.pipe';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { LeftNavBarComponent } from './left-nav-bar/left-nav-bar.component';
import { UsersComponent } from './github/users/users.component';

@NgModule({
  declarations: [AppComponent, SortPipe, HomeComponent, HeaderComponent, LeftNavBarComponent, UsersComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule],
  exports: [],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
