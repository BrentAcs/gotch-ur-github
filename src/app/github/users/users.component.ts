import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppUserService } from 'src/app/services/app-user.service';
import { AppUser } from 'src/app/shared/appuser.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  appUser: AppUser;

  constructor(private appUserService: AppUserService) {}

  ngOnInit(): void {
    this.appUserService.appUserChanged.subscribe((appUser) => {
      console.log('users, app user changed.');
      console.log(appUser);
      this.appUser = appUser;
    });
    this.appUserService.load();
  }

  ngOnDestroy() {
    this.appUserService.appUserChanged.unsubscribe();
  }
}
