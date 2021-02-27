import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

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

  var firebaseConfig = {
    apiKey: 'AIzaSyCf4tYpHZGpuHBTM68jWmduyhOzdimabYA',
    authDomain: 'gotchurgithub.firebaseapp.com',
    databaseURL: 'https://gotchurgithub-default-rtdb.firebaseio.com',
    projectId: 'gotchurgithub',
    storageBucket: 'gotchurgithub.appspot.com',
    messagingSenderId: '1032076705108',
    appId: '1:1032076705108:web:aab28eede1597ea6191cc1',
    measurementId: 'G-M1M4JG9KV4',
  };

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
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
  ],
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
