import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import { AppSettingsService } from './services/app-settings/app-settings.service';
import { AppUserService } from './services/app-user/app-user.service';
import { AppUser } from './shared/app-user.model';
import { PersistedAppUser } from './shared/persisted-app-user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private appUserService: AppUserService,
    private appSettingsService: AppSettingsService,
    //private firebase: FirebaseClientService,
    private firestore: AngularFirestore,
    private firebase: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.appUserService.load();
    this.appSettingsService.load();

    // https://bezkoder.com/angular-10-firebase-crud/
  }

  dbPath = '/app-users';
  appUsersRef: AngularFireList<AppUser> = null;
  onCreate() {
    const user = new AppUser(
      'Brent',
      'Test-acces-token-please-ignore',
      true,
      'kitty',
      true
    );
    const user2 = new AppUser(
      'Connor',
      'Test-acces-token-please-ignore-2',
      true,
      'lucas',
      true
    );
    // console.log('app user:');
    // console.log(user);

    const persistedUser = PersistedAppUser.toPersisted(user);
    const persistedUser2 = PersistedAppUser.toPersisted(user2);
    // console.log('persisted app user:');
    // console.log(persistedUser);

    let test = persistedUser.toObject();
    // console.log(persistedUser);
    // console.log(test);

    // goes to c-tor

    console.log('pushing to firebase');
    this.appUsersRef = this.firebase.list(this.dbPath);
    this.appUsersRef.push(persistedUser2).then(() => {
      console.log('Created new item successfully!');
    });
    //appUsersRef.push(persistedUser2);

    // const users = appUsersRef;
    // console.log(appUsersRef);

    //this.firebase.database.

    // let id = this.firestore.createId();
    // console.log('id: ' + id );

    // this.firestore
    //   .collection('appUsers')
    //   .add({test: 'test value'})
    //   .then( res => {
    //     console.log('res');
    //     console.log(res);
    //   })
    //   .catch( error => {
    //     console.error(error);
    //   });

    //console.log('test posting app user.');
    // this.firebase.postAppUser(persistedUser);
    // this.firebase.postAppUser(persistedUser2);

    const user10 = PersistedAppUser.fromPersisted(persistedUser);
    const user11 = PersistedAppUser.fromPersisted(persistedUser2);
    // console.log('app user 2:');
    // console.log(user2);
  }

  onFetch(){
    console.log('fetching from firebase');

    this.appUsersRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        console.log(data);
        // this.tutorials = data;
      });

    // appUsersRef = this.firebase.list(this.dbPath);
    // appUsersRef.push(persistedUser).then(() => {
    //   console.log('Created new item successfully!');
    // });
  }

}
