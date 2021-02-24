import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user/app-user.service';

import { AppUser } from 'src/app/shared/appuser.model';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css'],
})
export class ReposComponent implements OnInit {
  appUser: AppUser;

  constructor(private appUserService: AppUserService) {}

  ngOnInit(): void {
    this.appUserService.appUserChanged.subscribe((appUser) => {
      this.appUser = appUser;
    });
  }
}
