import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SortPipe } from './pipes/sort.pipe';
import { HomeComponent } from './content/home/home.component';
import { LeftNavBarComponent } from './left-nav-bar/left-nav-bar.component';
import { UsersComponent } from './content/users/users.component';
import { ReposComponent } from './content/repos/repos.component';
import { GitignoreTemplatesComponent } from './content/gitignore-templates/gitignore-templates.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { ContentHeaderComponent } from './content/content-header/content-header.component';
import { LoggingInterceptorService } from './services/logging-interceptor/logging-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SortPipe,
    AppHeaderComponent,
    HomeComponent,
    LeftNavBarComponent,
    UsersComponent,
    ReposComponent,
    GitignoreTemplatesComponent,
    ErrorPageComponent,
    ContentHeaderComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  exports: [],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
