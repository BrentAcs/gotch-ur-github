import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppUserService } from '../../services/app-user/app-user.service';
import { AppUser } from '../../shared/appuser.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('f') homeForm: NgForm;

  appUser: AppUser;

  constructor(private appUserService: AppUserService) {}

  ngOnInit(): void {
    this.appUserService.appUserChanged.subscribe((appUser) => {
      // console.log('home, app user changed.');
      // console.log(appUser);
      this.appUser = appUser;
    });
    this.appUserService.load();
  }

  onSubmit() {
    this.appUserService.save();
  }

  onClearUser() {
    this.appUserService.clear();
  }
}
