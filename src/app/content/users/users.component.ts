import { Component, OnInit } from '@angular/core';

import { AppUserService } from 'src/app/services/app-user/app-user.service';
import { AppUser } from 'src/app/shared/appuser.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  appUser: AppUser;
  currentUserName = '';

  constructor(private appUserService: AppUserService) {}

  ngOnInit(): void {
    this.appUserService.appUserChanged.subscribe((appUser) => {
      // console.log('users, app user changed.');
      // console.log(appUser);
      this.appUser = appUser;
      this.currentUserName = appUser.name;
    });
    this.appUserService.load();
  }

  onSubmit(){
    console.log('users form submitting...');
  }
}

