import { Component, Input, OnInit } from '@angular/core';

import { AppUserService } from 'src/app/services/app-user/app-user.service';
import { AppUser } from 'src/app/shared/appuser.model';
import { BaseContentComponent } from '../base-content/base-content.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent extends BaseContentComponent implements OnInit {

  constructor(appUserService: AppUserService) {
    super(appUserService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onTestClick() {
  }

  onSubmit() {
    console.log('users form submitting...');
  }
}
